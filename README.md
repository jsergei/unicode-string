Default JS strings report the index incorrectly when the string contains code points outside of the Base Multilingual Plane (smiles or cool letters, for example). This is because these symbols are represented using two consequetive code points, but the string treats them as two seperate symbols when calculating the index. UnicodeString class fixes this problem making all of the String.prototype methods return correct numbers.

```
test('one smile on the way', () => {
    const str = new UnicodeString('hello😀 there');
    const index = str.search(/the/);
    expect(index).toEqual(7); // 'hello😀 there'.search(/the/) will say 8
});

test('two smiles in the way', () => {
    const str1 = UnicodeString.from('Hi 😀😀😀 there 🀵𝄞𝐁');
    const str2 = UnicodeString.from('🀵𝄞'); // 'Hi 😀😀😀 there 🀵𝄞𝐁'.indexOf('🀵𝄞') would say 16

    expect(str1.indexOf(str2)).toEqual(13);
});
```
