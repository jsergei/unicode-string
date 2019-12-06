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

    }

    at(index) {
        if (index >= 0 && index <= this._strArr) {
            return this._strArr[index];
        } else {
            throw new Error('index is out of range');
        }
    }

    *[Symbol.iterator]() {
        yield* this._strArr;
    }

    toString() {
        return this._strArr.join('');
    }
}
