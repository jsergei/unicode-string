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

describe('substring', () => {
    test('check out of bounds indexes', () => {
        const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
        let emptyIndexes = [
            [-20, -10],
            [-10, -20],
            [20, 30],
            [30, 20]
        ];
        for (let [s, e] of emptyIndexes) {
            expect(str1.substring(s, e).length).toEqual(0);
        }
    });

    test('check full strings indexes', () => {
        const str1 = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
        let fullStrIndexes = [
            [-20, 20],
            [0, 20],
            [0, str1.length],
            [-10, str1.length],
            [str1.length, 0],
            [30, 0]
        ];
        for (let [s, e] of fullStrIndexes) {
            expect(str1.substring(s, e).length).toEqual(13);
        }
    });

    test('substring within range (at least one)', () => {
        const str = UnicodeString.from('Hi😀 there 🀵𝄞𝐁');
        expect(str.substring(10).equals('🀵𝄞𝐁')).toEqual(true);
        expect(str.substring(10, str.length).equals('🀵𝄞𝐁')).toEqual(true);
        expect(str.substring(4, 9).equals('there')).toEqual(true);
        expect(str.substring(9, 4).equals('there')).toEqual(true);
        expect(str.substring(str.length - 3, str.length).equals('🀵𝄞𝐁')).toEqual(true);
    });
});

describe('padStart', () => {
    test('no change: without params', () => {
        const str = new UnicodeString('hi');
        expect(str.padStart().length).toEqual(2);
    });

    test('no change: requestedLength <= length', () => {
        const str = new UnicodeString('hi');
        expect(str.padStart(1, 'a').length).toEqual(2);
        expect(str.padStart(2, 'a').length).toEqual(2);
    });

    test('no change: template is empty', () => {
        const str = new UnicodeString('hi');
        expect(str.padStart(5, '').length).toEqual(2);
    });

    test('add 3 smiles', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(5, '😀');
        expect(padded.length).toEqual(5);
        expect(padded.equals('😀😀😀hi')).toEqual(true);
    });

    test('add 3 letters', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(5, 'X');
        expect(padded.length).toEqual(5);
        expect(padded.equals('XXXhi')).toEqual(true);
    });

    test('add 2 3-letter words', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(8, 'xyz');
        expect(padded.length).toEqual(8);
        expect(padded.equals('xyzxyzhi')).toEqual(true);
    });

    test('add 2/1 letters of 3-letter words', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(9, 'xyz');
        console.log(padded.toString());
        expect(padded.length).toEqual(9);
        expect(padded.equals('xyzxyzxhi')).toEqual(true);
    });

    test('add 2/2 letters of 3-letter words', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(10, 'xyz');
        expect(padded.length).toEqual(10);
        expect(padded.equals('xyzxyzxyhi')).toEqual(true);
    });

    test('add 2/2 letters of 3-letter words with a smile', () => {
        const str = new UnicodeString('hi');
        const padded = str.padStart(10, 'xy😀');
        expect(padded.length).toEqual(10);
        expect(padded.equals('xy😀xy😀xyhi')).toEqual(true);
    });
});

describe('repeat', () => {
    test('repeat 0 times', () => {
        const str = new UnicodeString('hi😀');
        const repeated = str.repeat(0);
        expect(repeated.length).toEqual(0);
    });

    test('repeat 10 times an empty string', () => {
        const str = UnicodeString.empty;
        const repeated = str.repeat(10);
        expect(repeated.length).toEqual(0);
    });

    test('repeat 1 time', () => {
        const str = new UnicodeString('hi😀');
        const repeated = str.repeat(1);
        expect(repeated.length).toEqual(3);
        expect(repeated.equals('hi😀')).toEqual(true);
    });

    test('repeat 3 times', () => {
        const str = new UnicodeString('hi😀');
        const repeated = str.repeat(3);
        expect(repeated.length).toEqual(9);
        expect(repeated.equals('hi😀hi😀hi😀')).toEqual(true);
    });
});

describe('trimStart', () => {
    test('remove simple spaces', () => {
        const str = new UnicodeString('   hello world 😀');
        const trimmed = str.trimStart();
        expect(trimmed.length).toEqual(13);
        expect(trimmed.equals('hello world 😀')).toEqual(true);
    });
});

describe('trimEnd', () => {
    test('remove simple spaces', () => {
        const str = new UnicodeString('hello world 😀   ');
        const trimmed = str.trimEnd();
        expect(trimmed.length).toEqual(13);
        expect(trimmed.equals('hello world 😀')).toEqual(true);
    });
});
