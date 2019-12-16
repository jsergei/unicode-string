import { UnicodeString } from "./unicode-string";

test('asci only', () => {
    const str = new UnicodeString('hello there');
    const index = str.search(/the/);
    expect(index).toEqual(6);
});

test('one smile on the way', () => {
    const str = new UnicodeString('hello😀 there');
    const index = str.search(/the/);
    expect(index).toEqual(7);
});

test('two smiles on the way', () => {
    const str = new UnicodeString('😀hello😀 there');
    const index = str.search(/the/);
    expect(index).toEqual(8);
});

test('search for a smile with one smile on the way', () => {
    const str = new UnicodeString('😀hello😹');
    const index = str.search(/😹/u);
    expect(index).toEqual(6);
});

test('broken surrogate at the start', () => {
    const str = new UnicodeString('\uDE0E'); // low surragate of 😎
    const index = str.search(/\uDE0E/);
    expect(index).toEqual(0);
});

test('search for a low surrogate in a smile str', () => {
    const str = new UnicodeString('Hi😎');
    const index = str.search(/\uDE0E/);
    expect(index).toEqual(2);
});

test('search  in string of broken surrogates', () => {
    const str = new UnicodeString('\uDE0E\uD83D\uD83DT');
    const index = str.search(/T/);
    expect(index).toEqual(3);
});

test('cannot find a match', () => {
    const str = new UnicodeString('Hi😎 there');
    const index = str.search(/z/);
    expect(index).toEqual(-1);
});
