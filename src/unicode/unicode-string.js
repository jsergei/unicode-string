import { indexOf } from "./indexof";
import { startsWith } from "./starts-with";
import { endsWith } from "./ends-with";
import { lastIndexOf } from "./last-index-of";

export class UnicodeString {
    static from(inputStr) {
        return inputStr && inputStr instanceof UnicodeString
        ? inputStr
        : new UnicodeString(inputStr);
    }

    static get empty() {
        return new UnicodeString('');
    }

    constructor(inputStr) {
        if (!inputStr) {
            this._strArr = [];
        } else if (typeof inputStr === 'string' || Array.isArray(inputStr)  || inputStr instanceof UnicodeString) {
            this._strArr = [...inputStr];
        } else if (inputStr.hasOwnProperty('toString')) {
            this._strArr = [inputStr.toString()]
        } else {
            throw new Error('not supported');
        }
    }

    get length() {
        return this._strArr.length;
    }

    concat(str) {
        return new UnicodeString([...this, ...UnicodeString.from(str)]);
    }

    slice(start = 0, end = this.length) {
        start = Math.floor(start);
        end = Math.floor(end);
        return new UnicodeString(this._strArr.slice(start, end));
    }

    at(index) {
        index = Math.floor(index);
        if (index >= 0 && index < this._strArr.length) {
            return this._strArr[index];
        } else {
            throw new Error('index is out of range');
        }
    }

    equals(str) {
        // TODO: Consider normalization
        str = UnicodeString.from(str);
        if (this.length !== str.length) {
            return false;
        }
        for (let i = 0; i < str.length; i++) {
            if (this.at(i) !== str.at(i)) {
                return false;
            }
        }
        return true;
    }

    reverse() {
        // TODO: Consider normalization because of unicode combining marks
        return new UnicodeString([...this._strArr].reverse());
    }

    indexOf(searchString, startPosition = 0) {
        return indexOf(this, searchString, startPosition);
    }

    lastIndexOf(searchString, fromIndex = this.length) {
        return lastIndexOf(this, searchString, fromIndex);
    }

    includes(searchString, startPosition = 0) {
        return this.indexOf(searchString, startPosition) >= 0;
    }

    substring(indexStart = 0, indexEnd = this.length) {
        indexStart = Math.floor(indexStart);
        indexEnd = Math.floor(indexEnd);
        if (indexStart > indexEnd) {
            [indexStart, indexEnd] = [indexEnd, indexStart];
        }
        indexStart = Math.min(Math.max(0, indexStart), this.length);
        indexEnd = Math.min(Math.max(0, indexEnd), this.length);
        if (indexStart === this.length || indexEnd === 0) {
            return UnicodeString.empty;
        }
        if (indexStart === 0 && indexEnd === this.length) {
            return this;
        } else {
            return this.slice(indexStart, indexEnd);
        }
    }

    startsWith(searchString, startPosition = 0) {
        return startsWith(this, searchString, startPosition);
    }

    endsWith(searchString, length = this.length) {
        return endsWith(this, searchString, length);
    }

    padStart(length, template = ' ') {
        template = UnicodeString.from(template);
        length = Math.floor(length);
        if (!length || length <= this.length || template.length === 0) {
            return this;
        }

        const wholeParts = Math.floor((length - this.length) / template.length);
        const remaining = (length - this.length) % template.length;
        return new UnicodeString([
            ...template.repeat(wholeParts),
            ...template.substring(0, remaining),
            ...this
        ]);
    }

    padEnd(length, template = ' ') {
        template = UnicodeString.from(template);
        length = Math.floor(length);
        if (!length || length <= this.length || template.length === 0) {
            return this;
        }

        const wholeParts = Math.floor((length - this.length) / template.length);
        const remaining = (length - this.length) % template.length;
        return new UnicodeString([
            ...this,
            ...template.repeat(wholeParts),
            ...template.substring(0, remaining)
        ]);
    }

    repeat(times = 0) {
        times = Math.floor(times);
        if (times < 0) {
            throw new RangeError('Invalid count value');
        }
        if (times === 0 || this.length === 0) {
            return UnicodeString.empty;
        }

        const combined = new Array(this.length * times);
        for (let i = 0; i < times * this.length; i++) {
            combined[i] = this.at(i % this.length);
        }
        return new UnicodeString(combined);
    }

    trimStart() {
        return this.substring(this._findFirstNonSpaceCharacter());
    }

    trimEnd() {
        return this.substring(0, this._findLastNonSpaceCharacter() + 1);
    }

    _findFirstNonSpaceCharacter() {
        let index = 0;
        for (let char of this) {
            if (!/\s/.test(char)) {
                break;
            }
            index++;
        }
        return index;
    }

    _findLastNonSpaceCharacter() {
        let index = this.length - 1;
        for (; index >= 0; index--) {
            if (!/\s/.test(this.at(index))) {
                break;
            }
        }
        return index;
    }

    trim() {
        return this.substring(this._findFirstNonSpaceCharacter(), this._findLastNonSpaceCharacter() + 1);
    }

    search(regex) {
        const str = this.toString();
        let index = str.search(regex);
        let position = index;
        let pairs = 0;
        if (index >= 0) {
            // Check: non-unicode regex that matched a low surrogate pair instead of a high pair or a code point
            // Happens when not using the \u flag
            if (this._isLowSurrogatePair(str[index])) { 
                const prevChar = index - 1 >= 0 ? str[index - 1] : null;
                if (prevChar) {
                    if (this._isHighSurrogatePair(prevChar)) {
                        pairs++;
                    }
                    position--;
                } else {
                    return 0;
                }
            }

            // Count all of the preceeding surrogate pairs
            while (position >= 0) {
                const currChar = str[position];
                const prevChar = position - 1 >= 0 ? str[position - 1] : null;
                if (prevChar && this._isHighSurrogatePair(prevChar) && this._isLowSurrogatePair(currChar)) {
                    pairs++;
                    position-= 2;
                } else {
                    position--;
                }
            }

            return index - pairs;
        } else {
            return -1;
        }
    }

    _isHighSurrogatePair(char) {
        const code = char.charCodeAt(0);
        return code >= 0xD800 && code <= 0xDBFF;
    }

    _isLowSurrogatePair(char) {
        const code = char.charCodeAt(0);
        return code >= 0xDC00 && code <= 0xDFFF;
    }

    *[Symbol.iterator]() {
        yield* this._strArr;
    }

    [Symbol.toPrimitive](hint) {
        if (hint === 'number') {
            return this.length;
        } else if (hint === 'string') {
            return this.toString();
        } else { // 'default'
            return this.toString();
        }
    }

    get [Symbol.toStringTag]() {
        return 'UnicodeString';
    }

    toString() {
        return this._strArr.join('');
    }
}
