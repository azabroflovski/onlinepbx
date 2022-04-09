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

    // @ts-ignore
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

    /**
     * Create connection with onlinePBX
     * @param props
     */
    public connect(props: SocketConnection): void {
        if (!props['port']) {
            props['port'] = this.defaultSettings.socket?.port
        }

        // @ts-ignore
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

    /**
     * Call command
     * @param name
     * @param data
     * @param callback
     */
    public command(name: CommandName | EventName, data: any, callback: any): void {
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

    /**
     * Events handling
     * @param event
     * @param callback
     */
    public on(event: EventName, callback: any): void {
        if (typeof callback === 'function') {
            // @ts-ignore
            this.socketEvents[event] = callback
        }
    }

    /**
     * Send ws commands
     * @param name
     * @param data
     * @param callback
     * @private
     */
    private sendCommand(name: CommandName | EventName, data: any, callback: any): void {
        data['callbackHash'] = this.addCallback(callback)
        this.socket.emit(name, data)
    }

    /**
     * Create callback
     * @param callback
     * @private
     */
    private addCallback(callback: any): boolean | string {
        if (typeof callback === 'function') {
            const hash: string = generateString(16)
            // @ts-ignore
            this.callbackEvents[hash] = callback
            return hash
        }

        return false
    }

    /**
     * Handle ws events
     * @param event
     * @param data
     * @private
     */
    private socketEventHandler(event: EventName | CommandName, data: any): void | boolean {
        if (event === 'connect') {
            this.connected = true
            while (this.commandsBuffer.length > 0) {
                const firstBuffer: Command = this.commandsBuffer[0]
                this.sendCommand(firstBuffer.name, firstBuffer.data, firstBuffer.callback)
                this.commandsBuffer.splice(0, 1)
            }
        } else if (event === 'connecting') {
            this.transport = data
        } else if (event === 'disconnect') {
            this.connected = false
            this.transport = false
        } else if (event === 'callback') {
            // @ts-ignore
            if (data && data['hash'] && typeof this.callbackEvents[data['hash']] === 'function') {
                // @ts-ignore
                let callback: any = this.callbackEvents[data['hash']]
                // @ts-ignore
                delete this.callbackEvents[data['hash']]
                callback(data)
            }
            return true
        }

        // @ts-ignore
        if (typeof this.socketEvents[event] === 'function') {
            // @ts-ignore
            this.socketEvents[event](data)
        }
    }

    /**
     * Create socket connection
     * @private
     */
    private socketConnect(): void {
        // @ts-ignore
        this.socket = io.connect(this.socketUrl, {
            'query': 'key=' + this.settings.apiKey + '&domain=' + this.settings.domain,
            'force new connection': true
        })

        this.socket.$emit = this.socketEventHandler
    }

    /**
     * Get socket URL address
     */
    get socketUrl(): string {
        return this.settings.socket?.protocol + this.settings.domain + ':' + this.settings.socket?.port
    }
}