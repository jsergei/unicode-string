import '../css/style.scss';

const popupBackground = document.querySelector('.background');
const stringGlyphsEl = document.querySelector('.string-glyphs');
const stringCodeEl = document.querySelector('.string-code');
const startRangeEl = document.querySelector('#startRange');
const endRangeEl = document.querySelector('#endRange');

let stringGlyphParts = [];
let standChar = '';

document.querySelector('#show').addEventListener('click', () => {
    const startRange = parseInt(startRangeEl.value, 16);
    const endRange = parseInt(endRangeEl.value, 16);

    if (!startRange || !endRange || startRange > endRange) {
        alert('start and end must be two numbers start <= end');
    } else {
        generateGlyphs(startRange, endRange);
        popupBackground.style.display = '';
    }
});

popupBackground.addEventListener('click', event => {
    if (event.target === popupBackground) {
        popupBackground.style.display = 'none';
    } else if (event.target.matches('span')) {
        const glyph = event.target.textContent;

        // create a code point
        const code = document.createElement('span');
        code.classList.add('code-point');
        code.textContent = glyph.codePointAt(0).toString(16);
        stringCodeEl.append(code);

        // create a glyph
        stringGlyphParts.push(glyph);
        displayStringGlyphs();
    }
});

function generateGlyphs(startRange, endRange) {
    const popupInner = popupBackground.querySelector('.popup');
    popupInner.innerHTML = '';
    for (let codePoint = startRange; codePoint <= endRange; codePoint++) {
        const wrapper = document.createElement('span');
        wrapper.classList.add('glyph');
        wrapper.textContent = standChar + String.fromCodePoint(codePoint);
        popupInner.append(wrapper);
    }
}

function displayStringGlyphs() {
    stringGlyphsEl.textContent = stringGlyphParts.join('');
}

document.querySelector('#backspace').addEventListener('click', event => {
    if (stringCodeEl.childElementCount > 0) {
        stringCodeEl.lastElementChild.remove();

        stringGlyphParts = stringGlyphParts.slice(0, stringGlyphParts.length - 1);
        displayStringGlyphs();
    }
});

document.querySelector('#combining-marks').addEventListener('click', () => {
    startRangeEl.value = '0300';
    endRangeEl.value = '036F';
    standChar = '\x61';
});

document.querySelector('#letters').addEventListener('click', () => {
    startRangeEl.value = '50';
    endRangeEl.value = '100';
    standChar = '';
});

// const hyphenedName = 'top-left-corner';
// const camel = hyphenedName.replace(/-(\w+)/g, (match, word) => {
//     return word[0].toUpperCase() + word.substring(1);
// });
// console.log(`upper-cased: ${camel}`);


// const camelName = 'TopLeftCorner';
// const hyphened = camelName.replace(/[A-Z]/g, (match, index) => {
//     return  (index > 0 ? '-' : '') + match.toLowerCase();
// });
// console.log(`hyphened: ${hyphened}`);


// const report = `The temperature outside is -21.3C. It is expected to raise to +2C by early afernoon.
// Some claim it might be as high as 8.3c or even 10 or as low as 0C, but there is no evidence to back it up.`;

// let toFahrenheit = str => str.replace(/([\-+])?(\d+(?:\.\d+)?)[cC]/g, (match, sign, number) => {
//     // C = (F - 32) * 5/9
//     // F = C * 9/5 + 32
//     const asNum = +number * (sign === '-' ? -1 : 1);
//     const fahr = asNum * 9/5 + 32;
//     const negative = fahr < 0;
//     const zero = fahr === 0;
//     return (negative ? '-' : (zero ? '' : '+'))
//         + Math.abs(fahr).toFixed(2)
//         + 'F';
// });
// console.log(toFahrenheit(report));


// const str = 'yeah, yeah,  YEAH,   Hello, yeah,   World,   yeah,  yeah, yeah, yeah, hi!,   yeah';
// const result = str.replace(/(?:\s*,?\s*yeah\s*,?\s*)+/gi, (match, index, all) => {
//     return (index === 0 || index + match.length === all.length) ? '' : ' ';
// });
// console.log(`result: "${result}"`);


// const dateStr = 'Today is Tue 1:28 PM, December 17, 2019. So please be ready.';
// /\b(\w{3})\s*(\d{1,2}:\d{2})\s*(am|pm),?\s*(\w*)\s*(\d{1,2},?\s*(\d{4}))\b/i


// Fill in the regular expressions


// function verify(regexp, yes, no) {
//     // Ignore unfinished exercises
//     if (regexp.source == "...") return;
//     for (let str of yes) if (!regexp.test(str)) {
//         console.log(`Failure to match '${str}'`);
//     }
//     for (let str of no) if (regexp.test(str)) {
//         console.log(`Unexpected match for '${str}'`);
//     }
// }

// // car and cat
// verify(/\bca(?:t|r)s?\b/,
//     ["my car", "bad cats", "noisy cars", "cat", "my cat"],
//     ["camper", "high art", "cart", "Ben Carson", "carret", "acat", "wildcat", "flyingcar", "catso", "catos"]);

// // pop and prop
// verify(/\b(?:(?:prop(?:s)?)|pop)\b/,
//     ["pop culture", "mad props", "pop", "object prop", "jiggy pop"],
//     ["plop", "prrrop", "lollipop", "lollipops", "pops", "crops", "crop"]);

// // ferret, ferry, and ferrari
// verify(/\bferr(?:y|et|ari)\b/,
//     ["ferret", "ferry", "ferrari"],
//     ["ferrum", "transfer A"]);

// // Any word ending in ious
// verify(/\b(\w*)ious\b/,
//     ["how delicious", "spacious room", "space very ious"],
//     ["ruinous", "consciousness", "poisonous", "spaciousness", "iousx"]);

// // A whitespace character followed by a period, comma, colon, or semicolon
// verify(/\s[.,;:]/,
//     ["bad punctuation .", "hey ,you!", "what is this mess ; he slipped", "result :fail", "He said . No!", ' . cannot do' ],
//     ["escape the period", "Hello, there", "Hey,you", "start; stop", "result: pass"]);

// // A word longer than six letters
// verify(/\w{7,}/,
//     ["hottentottententen"],
//     ["no", "hotten totten tenten"]);

// // A word without the letter e (or E)
// verify(/\b[^e\s]+\b/i,
//     ["red platypus", "wobbling nest"],
//     ["earth bed", "learning ape", "BEET"]);



// const text = "'I'm the cooks' chief,' he said, 'it's my job.'";
// const reQuoted = text.replace(/'/g, (match, index, all) => {
//     if (index === 0 || index === all.length - 1) {
//         return '"';
//     }
//     const prev = all[index - 1];
//     const next = all[index + 1];
//     if (/\W/.test(prev) || (/\W/.test(next) && prev.toLowerCase() !== 's')) {
//         return '"';
//     }
//     return '\'';
// });
// console.log(`re-quoted: ${reQuoted}`);



// Fill in this regular expression.
let number = /^[\-+]?(\d+(\.\d*)?|\.\d+)([eE][\-+]?\d+)?$/;

// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
    if (!number.test(str)) {
        console.log(`Failed to match '${str}'`);
    }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
    if (number.test(str)) {
        console.log(`Incorrectly accepted '${str}'`);
    }
}
