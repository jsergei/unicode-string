import '../css/style.scss';
import { UnicodeString } from './unicode-string';

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


const str1 = UnicodeString.from('😀🀵𝄞𝐁');
console.log(str1.length);

const str2 = UnicodeString.from('Hello: ');
console.log(str2.length);

const union = str2.concat(str1);
console.log(union.length);
console.log(union.toString());

let a = {
    inner: {
        obj1: 'hi',
        obj2: 'no'
    },
    outer: {
        obj1: 13
    },
    //arr: [1,2,3]
};

function show({arr = [4, 5]}) {
    const [,,lastElement = -1] = arr;
    console.log(`arr: ${lastElement}`);
}
show(a);
