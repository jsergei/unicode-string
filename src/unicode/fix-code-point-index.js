import { isHighSurrogatePair, isLowSurrogatePair } from "./utils";

export function fixCodePointIndex(str, index) {
    if (!str || !str.length || str.length <= 0) {
        return index;
    }

    let position = index;
    let pairs = 0;
    // Check: non-unicode regex that matched a low surrogate pair instead of a high pair or a code point
    // Happens when not using the \u flag
    if (isLowSurrogatePair(str[index])) { 
        const prevChar = index - 1 >= 0 ? str[index - 1] : null;
        if (prevChar) {
            if (isHighSurrogatePair(prevChar)) {
                pairs++;
            }
            position--;
        } else {
            return 0;
        }
    }

    // Count all of the preceeding surrogate pairs
    while (position >= 0) {
        const currChar = str[position];
        const prevChar = position - 1 >= 0 ? str[position - 1] : null;
        if (prevChar && isHighSurrogatePair(prevChar) && isLowSurrogatePair(currChar)) {
            pairs++;
            position-= 2;
        } else {
            position--;
        }
    }

    return index - pairs;
}
