import { UnicodeString } from "./unicode-string";

test('two smiles in the way', () => {
    const str1 = UnicodeString.from('Hi 😀😀😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞');

    expect(str1.indexOf(str2)).toEqual(13);
});

test('no surrogate pairs in the way', () => {
    const str1 = UnicodeString.from('Hi ABC there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞');

    expect(str1.indexOf(str2)).toEqual(13);
});

test('two equal strings', () => {
    const str1 = UnicodeString.from('Hi there');
    const str2 = UnicodeString.from('Hi there');

    expect(str1.indexOf(str2)).toEqual(0);
});

test('match at the start', () => {
    const str1 = UnicodeString.from('Hi there');
    const str2 = UnicodeString.from('Hi');

    expect(str1.indexOf(str2)).toEqual(0);
});

test('match at the position start', () => {
    const str1 = UnicodeString.from('Hi there');
    const str2 = UnicodeString.from('there');

    expect(str1.indexOf(str2, 3)).toEqual(3);
});

test('match at the position start with negative position', () => {
    const str1 = UnicodeString.from('Hi there');
    const str2 = UnicodeString.from('there');

    expect(str1.indexOf(str2, -2)).toEqual(3);
});

test('match at the end', () => {
    const str1 = UnicodeString.from('Hi there');
    const str2 = UnicodeString.from('re');

    expect(str1.indexOf(str2)).toEqual(6);
});

test('match: substring is empty', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('');

    expect(str1.indexOf(str2)).toEqual(0);
});

test('match: substring is empty at the end', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('');

    expect(str1.indexOf(str2, 100)).toEqual(str1.length);
});

test('no match: strings are different', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('Bye');

    expect(str1.indexOf(str2)).toEqual(-1);
});

test('no match: substring is out of bounds in the end', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞𝐁xxx');

    expect(str1.indexOf(str2)).toEqual(-1);
});

test('no match: substring is same but longer', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁123');

    expect(str1.indexOf(str2)).toEqual(-1);
});

test('no match: starting position cuts substring', () => {
    const str1 = UnicodeString.from('Hi 😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('there');

    expect(str1.indexOf(str2, 10)).toEqual(-1);
});
