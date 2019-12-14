import { UnicodeString } from "./unicode-string";

test('find the later one of the two equal words', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('World😀');
    expect(index).toEqual(13);
});

test('find the later one of the two equal words, fromIndex', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('World😀', 13);
    expect(index).toEqual(13);
});

test('find the former one of the two equal words, fromIndex', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('World😀', 12);
    expect(index).toEqual(6);
});

test('not find any one of the two equal words, fromIndex', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('World😀', 0);
    expect(index).toEqual(-1);
});

test('search for an empty string', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('');
    expect(index).toEqual(19);
});

test('search for an empty string, fromIndex', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('', 1);
    expect(index).toEqual(1);
});

test('search str is as long as base str', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('Hello World😀 World😀');
    expect(index).toEqual(0);
});

test('search str is longer than base str', () => {
    const str = UnicodeString.from('Hello World😀 World😀');
    const index = str.lastIndexOf('Hello World😀 World😀😀');
    expect(index).toEqual(-1);
});
