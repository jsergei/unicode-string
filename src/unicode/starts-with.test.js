import { UnicodeString } from "./unicode-string";

test('match: startIndex not set', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('Hi😀');

    expect(str1.startsWith(str2)).toEqual(true);
});

test('match: startIndex is negative', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('Hi😀');

    expect(str1.startsWith(str2, -10)).toEqual(true);
});

test('match empty: startIndex is negative', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('')).toEqual(true);
});

test('match empty: startIndex is > length', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('', 20)).toEqual(true);
});

test('match 0 < startIndex < length', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('🀵', 10)).toEqual(true);
});

test('no match: different str', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('Ab')).toEqual(false);
});

test('no match: startIndex cuts off a bit', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('there', 5)).toEqual(false);
});

test('no match: same but longer word', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    expect(str1.startsWith('Hi😀 there 🀵𝄞𝐁1')).toEqual(false);
});
