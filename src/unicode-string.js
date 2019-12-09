export class UnicodeString {
    static from(inputStr) {
        return new UnicodeString(inputStr);
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

    concat(uniStr) {
        return new UnicodeString([...this, ...uniStr]);
    }

    slice(start, end) {
        return new UnicodeString(this._strArr.slice(start, end));
    }

    at(index) {
        if (index >= 0 && index < this._strArr.length) {
            return this._strArr[index];
        } else {
            throw new Error('index is out of range');
        }
    }

    equals(str) {
        // TODO: Consider normalization
        const uniStr = new UnicodeString(str);
        if (this.length !== uniStr.length) {
            return false;
        }
        for (let i = 0; i < uniStr.length; i++) {
            if (this.at(i) !== uniStr.at(i)) {
                return false;
            }
        }
        return true;
    }

    reverse() {
        return new UnicodeString([...this._strArr].reverse());
    }

    indexOf(pattern) {
        // TODO: Consider normalization
        const uniPattern = new UnicodeString(pattern);
        const letters = new Set(uniPattern);
        if (letters.size === 0) {
            return 0;
        }
        if (this.length === 0 || uniPattern.length > this.length) {
            return -1;
        }

        // init the sliding window
        let errors = 0;
        for (let i = 0; i < letters.size; i++) {
            if (!letters.has(this.at(i))) {
                errors++;
            }
        }

        const strMinusPattern = this.length - letters.size;
        for (let i = 0; i <= strMinusPattern; i++) {
            // Try to match a substring iff there are no errors
            if (!errors) {
                let fullMatch = true;
                for (let j = i; j < i + letters.size; j++) {
                    if (this.at(j) !== uniPattern.at(j - i)) {
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

    includes(uniStr) {
        throw new Error('not implemented');
    }

    startsWith(uniStr) {
        throw new Error('not implemented');
    }

    endsWith(uniStr) {
        throw new Error('not implemented');
    }

    padStart(padStr, length) {
        throw new Error('not implemented');
    }

    padEnd(padEnd, length) {
        throw new Error('not implemented');
    }

    repeat(times) {
        throw new Error('not implemented');
    }

    trimStart() {
        throw new Error('not implemented');
    }

    trimEnd() {
        throw new Error('not implemented');
    }

    *[Symbol.iterator]() {
        yield* this._strArr;
    }

    toString() {
        return this._strArr.join('');
    }
}
