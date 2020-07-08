export function tryParseSafeInt(rawNum: string): number | undefined {

    // Ensure the input is a string.
    if (typeof rawNum !== 'string') return undefined;

    // Check for an optional +/- sign, and ensure there is at least one character after the sign.
    let pos = 0;
    const len = rawNum.length;
    let charCode = rawNum.charCodeAt(pos);
    let isNegative = charCode == MINUS_SIGN;
    if (isNegative || charCode === PLUS_SIGN) ++pos;
    if (pos >= len) return;

    // Construct the number digit-by-digit.
    let result = 0;
    for (; pos < len; ++pos) {
        charCode = rawNum.charCodeAt(pos);
        if (charCode < ZERO_DIGIT || charCode > NINE_DIGIT) return; // reject due to invalid character
        result = result * 10 + (charCode - ZERO_DIGIT); // will never throw, but may overflow to Infinity
    }

    // Apply the sign to the resulting number.
    if (isNegative) result = -result;

    // Ensure the result is a safe integer.
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
    if (!Number.isSafeInteger(result)) return;

    // The string representation passes all checks. Return the resulting number.
    return result;
}


const MINUS_SIGN = '-'.charCodeAt(0);
const PLUS_SIGN = '+'.charCodeAt(0);
const ZERO_DIGIT = '0'.charCodeAt(0);
const NINE_DIGIT = '9'.charCodeAt(0);
