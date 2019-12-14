import { UnicodeString } from "./unicode-string";

export function startsWith(baseStr, searchString, startPosition) {
    searchString = UnicodeString.from(searchString);
    startPosition = Math.floor(startPosition);

    if (searchString.length === 0) {
        return true;
    }
    if (!startPosition || startPosition < 0) {
        startPosition = 0;
    }
    if (startPosition + searchString.length > baseStr.length) {
        return false;
    }
    
    for (let i = startPosition; i < startPosition + searchString.length; i++) {
        if (baseStr.at(i) !== searchString.at(i - startPosition)) {
            return false;
        }
    }
    return true;
}