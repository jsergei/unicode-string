export function isHighSurrogatePair(char) {
    const code = char.charCodeAt(0);
    return code >= 0xD800 && code <= 0xDBFF;
}

export function isLowSurrogatePair(char) {
    const code = char.charCodeAt(0);
    return code >= 0xDC00 && code <= 0xDFFF;
}
