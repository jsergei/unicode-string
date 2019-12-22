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



// // Fill in this regular expression.
// let number = /^[\-+]?(\d+(\.\d*)?|\.\d+)([eE][\-+]?\d+)?$/;

// // Tests:
// for (let str of ["1", "-1", "+15", "1.55", ".5", "5.", "1.3e2", "1E-4", "1e+12"]) {
//     if (!number.test(str)) {
//         console.log(`Failed to match '${str}'`);
//     }
// }
// for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5", ".5.", "1f5", "."]) {
//     if (number.test(str)) {
//         console.log(`Incorrectly accepted '${str}'`);
//     }
// }


// // password
// // contain at least 8 symbols, 2 uppercase letters, 2 digits, 1 special symbol, (opt: at least 4 unique characters)
// // example H31!C0pter

// // (?=.*?[A-Z].*?[A-Z])
// const passwordRules = /(?=.*?[A-Z].*?[A-Z])(?=.*?\d.*?\d)(?=.*?[!@#$%^&*(),.?])/;
// // Tests:
// for (let str of ["H31!C0pter", "11AB!abc"]) {
//     if (!passwordRules.test(str)) {
//         console.log(`Failed to match '${str}'`);
//     }
// }
// for (let str of ["Helicopter", "hi", "Kim John Un", "1984", "The Year is 1984", "11AB!"]) {
//     if (passwordRules.test(str)) {
//         console.log(`Incorrectly accepted '${str}'`);
//     }
// }


// // bb-tags https://javascript.info/regexp-alternation; b, url, quote; [tag]...[/tag]
// const regexp = /\[(?<tag>b|url|quote)\](?<contents>[\s\S]*?)\[\/\1\]/ig;

// const str = `Here is the url:
// [url]
//     [quote]piggy:[/quote]
//     http://google.com
// [/url]. You're [b]welcome[/b].`;
// // const str = 'Hello there!';
// [...str.matchAll(regexp)].forEach(({groups: {tag, contents}}) =>
//     console.log(`tag: ${tag.trim()}, contents: ${contents.trim()}`));



// // find qoted strings
// const str = 'Hi there. "Yeah, nice to meet you". "Do you know \\"your\\" neighbours," he asked.';
// // const regexp = /(?<!\\)"([\s\S]*?)(?<!\\)"/g;
// const regexp = /[^\\]"([\s\S]*?[^\\])"/g;
// [...str.matchAll(regexp)].forEach(([_, qouted]) =>
//     console.log(`qouted: ${qouted.trim()}`));



// find the full tag
const str = `
<style>
<div name="style">Hello<span>there</span></div>
<styler>
<style id="top-left" type="text/css" name="style">`;
const regexp = /<style(?:>|\s([^>]*?)>)/g;
[...str.matchAll(regexp)].forEach(info => {
    const [_, styleContents = 'empty'] = info;
    console.log(`index: ${info.index}, style: ${styleContents}`);
});
