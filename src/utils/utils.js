import moment from "moment";
import jwt_decode from "jwt-decode";

export const fromMilisecondsToDate = (milisecondsSinceEpoch) => {
    const date = new Date(milisecondsSinceEpoch * 1000);
    return date.toUTCString();
};

export function convertStringToArray(input) {
    if (input.startsWith("[")) {
        input = input.substring(1, input.length);
    }
    if (input.endsWith("]")) {
        input = input.substring(0, input.length - 1);
    }
    return input.split(",");
}

export function isExpired(secondsSinceEpoch) {
    return secondsSinceEpoch < Date.now() / 1000;
}

export function getCurrentDateAsDBFormat() {
    return moment().format("YYYY/M/D");
}

export function decodeToken(token) {
    return jwt_decode(token.substring(7, token.length));
}
