import { UnicodeString } from './unicode-string';

test('show correct length', () => {
    const str = UnicodeString.from('😀🀵𝄞𝐁');
    expect(str.length).toBe(4);
    // ex

    // const str2 = UnicodeString.from('Hello: ');
    // const union = str2.concat(str1);
});
