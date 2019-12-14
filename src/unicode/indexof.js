import { UnicodeString } from "./unicode-string";
import { stringsMatch } from "./strings-match";

export function indexOf(baseStr, searchStr, fromIndex) {
    // TODO: Consider normalization
    searchStr = UnicodeString.from(searchStr);
    fromIndex = Math.floor(fromIndex);
    if (Number.isNaN(fromIndex)) {
        fromIndex = 0;
    }
    fromIndex = Math.min(Math.max(0, fromIndex), baseStr.length);
    const letters = new Set(searchStr);
    if (searchStr.length === 0) {
        return fromIndex;
    }
    if (baseStr.length === 0 || searchStr.length > baseStr.length - fromIndex) {
        return -1;
    }

    // init the sliding window
    let errors = 0;
    for (let i = fromIndex; i < fromIndex + searchStr.length; i++) {
        if (!letters.has(baseStr.at(i))) {
            errors++;
        }
    }

    const strMinusPattern = baseStr.length - searchStr.length;
    for (let i = fromIndex; i <= fromIndex + strMinusPattern; i++) {
        // Try to match a substring iff there are no errors
        if (!errors && stringsMatch(baseStr, searchStr, i)) {
            return i;
        }
        
        // Update errors by removing the first letter and adding the next
        if (i + 1 <= strMinusPattern) {
            errors -= letters.has(baseStr.at(i)) ? 0 : 1;
            errors += letters.has(baseStr.at(i + searchStr.length)) ? 0 : 1;
        }
    }
    
    return -1;
}