import { stringsMatch } from "./strings-match";
import { UnicodeString } from "./unicode-string";

export function lastIndexOf(baseStr, searchString, fromIndex) {
    // TODO: Consider normalization
    searchString = UnicodeString.from(searchString);
    fromIndex = Math.floor(fromIndex);
    if (Number.isNaN(fromIndex)) {
        fromIndex = baseStr.length;
    }
    fromIndex = Math.min(Math.max(fromIndex, 0), baseStr.length);
    
    const letters = new Set(searchString);
    if (searchString.length === 0) {
        return fromIndex;
    }
    if (baseStr.length === 0 || searchString.length > baseStr.length) {
        return -1;
    }

    // init the sliding window
    let errors = 0;
    fromIndex = Math.min(baseStr.length - searchString.length, fromIndex);
    for (let i = fromIndex; i < fromIndex + searchString.length; i++) {
        if (!letters.has(baseStr.at(i))) {
            errors++;
        }
    }

    for (let i = fromIndex; i >= 0; i--) {
        // Try to match a substring iff there are no errors
        if (!errors && stringsMatch(baseStr, searchString, i)) {
            return i;
        }
        
        // Update errors by removing the last letter and adding the next from the left
        if (i - 1 >= 0) {
            errors -= letters.has(baseStr.at(i + searchString.length - 1)) ? 0 : 1;
            errors += letters.has(baseStr.at(i - 1)) ? 0 : 1;
        }
    }
    
    return -1;
}
