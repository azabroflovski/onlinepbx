import {
    Settings,
    EventName,
    Command,
    CommandName,
    Socket,
    SocketConnection,
} from '../typings'

import { generateString, strToSnakeCase } from '../helpers'
import { defaultSettings } from '../config'

export class OnlinePBX {
    public connected = false
    public transport = false

    private settings: Settings
    private defaultSettings: Settings = defaultSettings

    private socket: Socket
    private callbackEvents = {}
    private socketEvents = {}
    private commandsBuffer: Command[] = []

    constructor(settings: Settings) {
        if (!settings || typeof settings['domain'] != 'string' || typeof settings['apiKey'] != 'string') {
            throw 'domain and key required'
        }

        this.settings = settings
    }

    public connect(props: SocketConnection): void {
        if (!props['port']) {
            props['port'] = this.defaultSettings.socket?.port
        }

        if (typeof io !== 'undefined') {
            this.socketConnect()
        } else {
            const scriptTag = document.createElement('script')
            scriptTag.type = 'text/javascript'
            scriptTag.src = this.socketUrl
            scriptTag.onload = () => {
                this.socketConnect()
            }

            document.getElementsByTagName('head')[0].appendChild(scriptTag);
        }
    }

    public command(name: CommandName | EventName, data, callback): void {
        if (typeof callback === 'undefined' && typeof data === 'function') {
            callback = data
            data = {}
        } else if (typeof data === 'undefined') {
            data = {}
        }
        if (this.connected) {
            this.sendCommand(<CommandName | EventName>strToSnakeCase(name), data, callback)
        } else {
            this.commandsBuffer.push(<Command>{
                name,
                data,
                callback
            })
        }
    }

    public on(event: EventName, callback): void {
        if (typeof event === 'string' && typeof callback === 'function') {
            this.socketEvents[event] = callback;
        }
    }

    private sendCommand(name: CommandName | EventName, data, callback): void {
        data['callbackHash'] = this.addCallback(callback)
        this.socket.emit(name, data)
    }

    private addCallback(callback): boolean | string {
        if (typeof callback === 'function') {
            const hash = generateString(16)
            this.callbackEvents[hash] = callback
            return hash
        }

        return false
    }

    private socketEventHandler(event: EventName | CommandName, data): void | boolean {
        if (event === 'connect') {
            this.connected = true
            while (this.commandsBuffer.length > 0) {
                const firstBuffer = this.commandsBuffer[0]
                this.sendCommand(firstBuffer.name, firstBuffer.data, firstBuffer.callback)
                this.commandsBuffer.splice(0, 1)
            }
        } else if (event === 'connecting') {
            this.transport = data
        } else if (event === 'disconnect') {
            this.connected = false
            this.transport = false
        } else if (event === 'callback') {
            if (data && data['hash'] && typeof this.callbackEvents[data['hash']] === 'function') {
                let callback = this.callbackEvents[data['hash']]
                delete this.callbackEvents[data['hash']]
                callback(data)
            }
            return true
        }

        if (typeof this.socketEvents[event] === 'function') {
            this.socketEvents[event](data)
        }
    }

    private socketConnect(): void {
        this.socket = io.connect(this.socketUrl, {
            'query': 'key=' + this.settings.apiKey + '&domain=' + this.settings.domain,
            'force new connection': true
        })

        this.socket.$emit = this.socketEventHandler
    }

    get socketUrl(): string {
        return this.settings.socket?.protocol + this.settings.domain + ':' + this.settings.socket?.port
    }
}