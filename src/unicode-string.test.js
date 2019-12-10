import { UnicodeString } from './unicode-string';

describe('concat', () => {
    test('show correct length', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁');
        expect(str1.length).toEqual(4);
    
        const str2 = UnicodeString.from('Hello: ');
        expect(str2.length).toEqual(7);
    });
    
    test('concat two strings', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁');
        const str2 = UnicodeString.from('Hello: ');
        const union = str1.concat(str2);
        expect(union.length).toEqual(11);
    });
});

describe('slice', () => {
    test('positive indexes', () => {
        const str1 = UnicodeString.from('The morning is upon us.');
        expect(str1.length).toEqual(23);

        const str2 = str1.slice(1, 8);
        expect(str2.toString()).toEqual('he morn');

        const str3 = str1.slice(4, -2);
        expect(str3.toString()).toEqual('morning is upon u');

        const str4 = str1.slice(12);
        expect(str4.toString()).toEqual('is upon us.');

        const str5 = str1.slice(30);
        expect(str5.toString()).toEqual('');
    });

    test('negative indexes', () => {
        const str = UnicodeString.from('The morning is upon us.');
        expect(str.length).toEqual(23);

        const str1 = str.slice(-3);
        expect(str1.toString()).toEqual('us.');

        const str2 = str.slice(-3, -1);
        expect(str2.toString()).toEqual('us');

        const str3 = str.slice(0, -1);
        expect(str3.toString()).toEqual('The morning is upon us');

        const str4 = str.slice(-11, 16);
        expect(str4.toString()).toEqual('is u');

        const str5 = str.slice(11, -7);
        expect(str5.toString()).toEqual(' is u');

        const str6 = str.slice(-5, -1);
        expect(str6.toString()).toEqual('n us');
    });

    test('unicode characters', () => {
        const str = UnicodeString.from('😀🀵𝄞𝐁');
        expect(str.slice(1, 3).length).toEqual(2);
    });
});

describe('reverse', () => {
    test('reverse unicode', () => {
        const str = UnicodeString.from('😀🀵𝄞𝐁');
        const result = str.reverse();

        expect(str.toString()).toEqual('😀🀵𝄞𝐁');
        expect(result.toString()).toEqual('𝐁𝄞🀵😀');
    });
});

describe('equals', () => {
    test('simple equality', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello World!');

        expect(str1.equals(str2)).toEqual(true);
    });

    test('simple inequality, unequal length', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello');

        expect(str1.equals(str2)).toEqual(false);
    });

    test('simple inequality, equal length', () => {
        const str1 = UnicodeString.from('Hello World!');
        const str2 = UnicodeString.from('Hello World1');

        expect(str1.equals(str2)).toEqual(false);
    });

    test('unicode inequality', () => {
        const str1 = UnicodeString.from('😀🀵𝄞𝐁!');
        const str2 = UnicodeString.from('A🀵𝄞𝐁!');

        expect(str1.equals(str2)).toEqual(false);
    });
});

describe('indexOf', () => {
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
});

describe('startsWith', () => {
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
});

describe('endsWith', () => {
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
});
