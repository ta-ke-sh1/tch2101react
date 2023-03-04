export const fromMilisecondsToDate = (ms) => {
    const date = new Date(ms * 1000);
    return date.toUTCString()
}

export function convertStringToArray(input) {
    if (input.startsWith('[')) {
        input = input.substring(1, input.length)
    }
    if (input.endsWith(']')) {
        input = input.substring(0, input.length - 1)
    }
    return input.split(',');
}

export function isExpired(date) {
    return date < (Date.now() / 1000);
}