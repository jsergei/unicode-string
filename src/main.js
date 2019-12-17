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


const str = 'yeah, yeah,  YEAH,   Hello, yeah,   World,   yeah,  yeah, yeah, yeah, hi!,   yeah';
const result = str.replace(/(?:\s*,?\s*yeah\s*,?\s*)+/gi, (match, index, all) => {
    return (index === 0 || index + match.length === all.length) ? '' : ' ';
});
console.log(`result: "${result}"`);
