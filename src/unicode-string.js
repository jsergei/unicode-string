export class UnicodeString {
    constructor([...str]) {
        this._strArr = str;
    }

    get length() {
        return this._strArr.length;
    }

    *[Symbol.iterator]() {
        yield* this._strArr;
    }
}
