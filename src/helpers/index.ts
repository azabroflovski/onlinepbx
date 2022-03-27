export function generateString(length: number = 16): string {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    let string = ''

    for (let i = 0; i < length; i++) {
        string += chars[(Math.floor(chars.length * Math.random()) - 1)]
    }

    return string
}

export function strToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
}