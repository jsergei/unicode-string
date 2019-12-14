export function stringsMatch(baseStr, searchStr, fromIndex) {
    for (let j = fromIndex; j < fromIndex + searchStr.length; j++) {
        if (baseStr.at(j) !== searchStr.at(j - fromIndex)) {
            return false;
        }
    }
    return true;
}
