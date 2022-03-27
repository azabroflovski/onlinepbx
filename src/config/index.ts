import { Settings } from '../typings'

export const defaultSettings: Settings = {
    apiKey: '',
    domain: '',
    autoConnect: false,
    socket: {
        protocol: 'https',
        port: 8093
    }
}