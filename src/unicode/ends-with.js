import { UnicodeString } from "./unicode-string";

export function endsWith(baseStr, searchString, length) {
    searchString = UnicodeString.from(searchString);
    length = Math.floor(length);

    if (searchString.length === 0) {
        return true;
    }
    if (length <= 0) {
        return false;
    }
    if (length > baseStr.length) {
        length = baseStr.length;
    }
    if (searchString.length > length) {
        return false;
    }

    const startPosition = length - searchString.length;
    for (let i = 0; i < searchString.length; i++) {
        if (baseStr.at(startPosition + i) !== searchString.at(i)) {
            return false;
        }
    }
    return true;
}
