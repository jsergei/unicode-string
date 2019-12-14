import { UnicodeString } from "./unicode-string";

test('match: length is not set', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞𝐁');

    expect(str1.endsWith(str2)).toEqual(true);
});

test('match: equal strings', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');

    expect(str1.endsWith(str2)).toEqual(true);
});

test('match: length cuts of the invalid part', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('there');

    expect(str1.endsWith(str2, 9)).toEqual(true);
});

test('match empty: length is -1', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('');

    expect(str1.endsWith(str2, -1)).toEqual(true);
});

test('match empty: length is too big', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('');

    expect(str1.endsWith(str2, 30)).toEqual(true);
});

test('not match: length not set', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞X');

    expect(str1.endsWith(str2)).toEqual(false);
});

test('not match: same but longer word', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('1Hi😀 there 🀵𝄞𝐁');

    expect(str1.endsWith(str2)).toEqual(false);
});

test('not match: different last symbol', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('hi😀 there 🀵𝄞𝐁');

    expect(str1.endsWith(str2)).toEqual(false);
});

test('not match: equal strings but length cuts off a bit', () => {
    const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('hi😀 there 🀵𝄞𝐁');

    expect(str1.endsWith(str2, 10)).toEqual(false);
});