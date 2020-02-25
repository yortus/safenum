// TODO: reject ill-formed `rawNum` strings, eg '1a'. Currently '1a' returns 1.



export function tryParseSafeFloat(rawNum: string): number | undefined {

    // Use built-in float parser to get the result.
    let result = Number.parseFloat(rawNum);

    // Reject out of hand if the result is NaN or +/-Infinity.
    if (!Number.isFinite(result)) return;

    // Reject if there are more than 15 significant decimal digits.
    // NB: This is a bit conservative, rejecting some numbers that can be represented exactly. However it never
    // accepts numbers that cannot be represented exactly. We could make this 100% exact in what it accepts/rejects
    // at the cost of some performance, by round-tripping from string->number->string and ensuring the strings match.
    // See https://en.wikipedia.org/wiki/Double-precision_floating-point_format#IEEE_754_double-precision_binary_floating-point_format:_binary64
    let pos = 0;
    const len = rawNum.length;
    let significantDigits = 0;
    if (pos < len && rawNum.charCodeAt(pos) === MINUS_SIGN) ++pos;
    while (pos < len) {
        let charCode = rawNum.charCodeAt(pos);
        if (charCode === LOWERCASE_E) break;
        if (charCode !== DECIMAL_POINT) ++significantDigits;
        ++pos;
    }
    return significantDigits > 15 ? undefined : result;
}


const MINUS_SIGN = '-'.charCodeAt(0);
const DECIMAL_POINT = '.'.charCodeAt(0);
const LOWERCASE_E = 'e'.charCodeAt(0);
const ZERO_DIGIT = '0'.charCodeAt(0);
const NINE_DIGIT = '9'.charCodeAt(0);
