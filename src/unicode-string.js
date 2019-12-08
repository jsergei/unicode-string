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
        if (index >= 0 && index <= this._strArr) {
            return this._strArr[index];
        } else {
            throw new Error('index is out of range');
        }
    }

    reverse() {
        throw new Error('not implemented');
    }

    indexOf(uniStr) {
        throw new Error('not implemented');
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
