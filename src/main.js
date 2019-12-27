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


// // password
// // contain at least 8 symbols, 2 uppercase letters, 2 digits, 1 special symbol, (opt: at least 4 unique characters)
// // example H31!C0pter

// // (?=.*?[A-Z].*?[A-Z])
// const passwordRules = /(?=.*?[A-Z].*?[A-Z])(?=.*?\d.*?\d)(?=.*?[!@#$%^&*(),.?])(?=.{8,})/;
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



// const str = `store is .,closed!!`;
// // const count = [...str.matchAll(/[aeiouy]/ig)].map(m => 1).reduce((prev, next) => prev + next);
// let count = 0;
// const regexp = /[aeiouy]/ig;
// while (regexp.exec(str)) { count++; }
// console.log(`number(vowels): ${count}`);



// const str = '-1234567.13';
// let [_, sign = '', int, float = ''] = /^([\-+]?)(\d+)(?:\.(\d+))?$/.exec(str) || [];
// // if (int) {
// //     int = [...int]
// //         .reverse()
// //         .join('')
// //         .replace(/\d{3}(?=\d)/g, '$&,');
// //     int = [...int].reverse().join('');
// // }
// if (int && int.length > 3) {
//     const remainder = (int.length % 3) || 3;
//     const [_, head, tail] = new RegExp(String.raw`(\d{${remainder}})(\d+)`).exec(int);
//     int = head + tail.replace(/\d{3}/g, ',$&');
// }
// const commas = sign + int + (float ? ('.' + float) : '');
// console.log(`num: "${commas}"`);



// // const str = 'http://google.com/help/me.html?age=20&sex=male%20ish#hash%3Ftag';
// const str = 'http:/asd///?tfg';
// // /^(\w+)\:(?:\/\/([\w\.\-]+))?([\w\/\.\-]+)?(?:\?([^#])+)?(?:#([\w\/\.\-]+))?$/
// const chars = String.raw`([\w\.\-*()%+\=\&]+)`;
// const charsSlash = String.raw`(\/[\w\.\-*()%+/]+)`;
// const regexp =  new RegExp(String.raw`^${chars}\:(?://${chars})?${charsSlash}?(?:\?${chars})?(?:#${chars})?$`);
// const [_, scheme = '', host = '', path = '', query = '', fragment = ''] = regexp.exec(str) || [];
// console.log(`scheme: "${scheme}",\nhost: "${host}",\npath: "${path}",\nquery: "${query}",\nfragment: "${fragment}"`);



// let regexp = /<\w+(\s*(?=(\w+))\2?(?:="[^"]+")?\s*)*>/g;
// let str = '<> <a href="/"> <input type="radio" checked> <b>';
// console.log( str.match(regexp) ); // '<a href="/">', '<input type="radio" checked>', '<b>'


function strToInt(str) {
    if (!str) {
        return 0;
    }
    let [_, sign, digits] = /^\x20*([+-]?)0*(\d+)/.exec(str) || [];
    if (!digits) {
        return 0;
    }
    const [min, max] = [(-2) ** 31, 2 ** 31 - 1];
    if (digits.length <= 10) { // Less than 10 Billion
        let number = +digits;
        if (sign === '-') {
            number = -number;
        }
        if (number > min && number < max) {
            return number;
        }
    }
    return sign === '-' ? min : max;
}



function parseEquation(s) {
    function operPriority(op) {
        return (op === '+' || op === '-') ? 0 : 1;
    }
    
    function applyOperator(numbers, operators) {
        const [b, a] = [numbers.pop(), numbers.pop()];
        const op = operators.pop();
        let result = 0;
        switch (op) {
            case '-': result = a - b; break;
            case '+': result = a + b; break;
            case '/': result = Math.floor(a / b); break;
            case '*': result = a * b; break;
            default: result = 0;
        }
        numbers.push(result);
    }

    const matches = s.matchAll(/(\d+)|([-+/*])/g);
    const numbers = [];
    const operators = [];
    for (let [_, number, operator] of matches) {
        if (number) {
            // if 1 * 2 - process at number => number
            // if 1 + 2 * 3 - process at number => 1 + n
            // if 1 + 2 - can't process at number here because the next operator could be * or /
            numbers.push(+number);
            if (operators.length === 2 || (operators.length === 1 && operPriority(operators[0]) === 1)) {
                // must be 1 +- 2 */ 3 if op.len == 2 (by exclusion) OR 1 */ 3 if op.len == 1 && op == '*' or '/'
                applyOperator(numbers, operators);
            }
        } else {
            // if 1 + 2 + - process at operator => n +
            if (operPriority(operator) === 0 && operators.length === 1 && operPriority(operators[0]) === 0) {
                applyOperator(numbers, operators);
            }
            operators.push(operator);
        }
    }
    if (operators.length) {
        applyOperator(numbers, operators);
    }
    return numbers.pop();
}

for (let [input, expected] of [
    ['3+2*2', 7],
    [' 3/2 ', 1],
    [' 3  -  2 ', 1],
    ['3-2+5+1', 7],
    ['3*2*5', 30],
    ['3*2-1', 5],
    ['3+2*4-5*2', 1],
    [' 3+5 / 2 ', 5],
    ['3+5-2/2+5/2*2', 11]
]) {
    const result = parseEquation(input);
    if (result !== expected) {
        console.log(`expected "${expected}" for input "${input}", but received: "${result}"`);
    }
}
