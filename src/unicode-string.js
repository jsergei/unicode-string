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
        // TODO: Consider normalization
        searchString = UnicodeString.from(searchString);
        startPosition = Math.floor(startPosition);
        if (startPosition < 0) {
            startPosition = 0;
        }
        const letters = new Set(searchString);
        if (searchString.length === 0) {
            return startPosition > this.length ? this.length : startPosition;
        }
        if (this.length === 0 || searchString.length > this.length - startPosition) {
            return -1;
        }

        // init the sliding window
        let errors = 0;
        for (let i = startPosition; i < startPosition + letters.size; i++) {
            if (!letters.has(this.at(i))) {
                errors++;
            }
        }

        const strMinusPattern = this.length - letters.size;
        for (let i = startPosition; i <= startPosition + strMinusPattern; i++) {
            // Try to match a substring iff there are no errors
            if (!errors) {
                let fullMatch = true;
                for (let j = i; j < i + letters.size; j++) {
                    if (this.at(j) !== searchString.at(j - i)) {
                        fullMatch = false;
                        break; // at least one letter is different
                    }
                }
                if (fullMatch) {
                    return i;
                }
            }
            
            // Update errors by removing the first letter and adding the next
            if (i + 1 <= strMinusPattern) {
                errors -= letters.has(this.at(i)) ? 0 : 1;
                errors += letters.has(this.at(i + letters.size)) ? 0 : 1;
            }
        }
        
        return -1;
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
        searchString = UnicodeString.from(searchString);
        startPosition = Math.floor(startPosition);

        if (searchString.length === 0) {
            return true;
        }
        if (startPosition < 0) {
            startPosition = 0;
        }
        if (startPosition + searchString.length > this.length) {
            return false;
        }
        
        for (let i = startPosition; i < startPosition + searchString.length; i++) {
            if (this.at(i) !== searchString.at(i - startPosition)) {
                return false;
            }
        }
        return true;
    }

    endsWith(searchString, length = this.length) {
        searchString = UnicodeString.from(searchString);
        length = Math.floor(length);

        if (searchString.length === 0) {
            return true;
        }
        if (length <= 0) {
            return false;
        }
        if (length > this.length) {
            length = this.length;
        }
        if (searchString.length > length) {
            return false;
        }

        const startPosition = length - searchString.length;
        for (let i = 0; i < searchString.length; i++) {
            if (this.at(startPosition + i) !== searchString.at(i)) {
                return false;
            }
        }
        return true;
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
