export function tryParseSafeFloat(rawNum: string): number | undefined {

    // Ensure the input is a string.
    if (typeof rawNum !== 'string') return undefined;

    // Use built-in float parser to get the result.
    let result = Number.parseFloat(rawNum);

    // Reject immediately if the result is NaN or +/-Infinity
    if (!Number.isFinite(result)) return;

    // Reject if the string is ill-formed, including if it contains invalid trailing characters.
    if (!FLOAT_REGEX.test(rawNum)) return;

    // Convert the parsed number back to a string. If the resulting string has an identical sequence of significant
    // digits to the original string, then the number can be represented exactly, so return it. Otherwise reject the
    // number, since it cannot be represented without loss of precision.
    let newNum = String(result);
    let [rawPos, rawLastIndex] = findFirstAndLastSignificantDigits(rawNum);
    let [newPos, newLastIndex] = findFirstAndLastSignificantDigits(newNum);
    if (rawPos === -1 && newPos === -1) return 0;
    if (rawPos === -1 || newPos === -1) return;
    while (true) {
        let rawChar = rawNum.charCodeAt(rawPos);
        if (rawChar === DECIMAL_POINT) rawChar = rawNum.charCodeAt(++rawPos);
        let newChar = newNum.charCodeAt(newPos);
        if (newChar === DECIMAL_POINT) newChar = newNum.charCodeAt(++newPos);
        if (rawChar !== newChar) return;
        if (rawPos === rawLastIndex && newPos === newLastIndex) return result;
        if (rawPos === rawLastIndex || newPos === newLastIndex) return;
        ++rawPos;
        ++newPos;
    }
}


function findFirstAndLastSignificantDigits(str: string): [number, number] {
    let len = str.length;
    let first = -1;
    let last = -1;
    for (let pos = 0; pos < len; ++pos) {
        let charCode = str.charCodeAt(pos);
        if (charCode === LOWERCASE_E || charCode === UPPERCASE_E) break;
        if (charCode < ZERO_DIGIT || charCode > NINE_DIGIT) continue;
        if (charCode !== ZERO_DIGIT) {
            if (first === -1) first = pos;
            last = pos;
        }
    }
    return [first, last];
}


const FLOAT_REGEX = /^[+-]?(?:(?:[0-9]+(?:[.][0-9]*)?(?:[eE][+-]?[0-9]+)?)|(?:[.][0-9]+(?:[eE][+-]?[0-9]+)?))$/;
const LOWERCASE_E = 'e'.charCodeAt(0);
const UPPERCASE_E = 'E'.charCodeAt(0);
const ZERO_DIGIT = '0'.charCodeAt(0);
const NINE_DIGIT = '9'.charCodeAt(0);
const DECIMAL_POINT = '.'.charCodeAt(0);
