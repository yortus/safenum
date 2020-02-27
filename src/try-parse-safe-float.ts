export function tryParseSafeFloat(rawNum: string): number | undefined {

    // Use built-in float parser to get the result.
    let result = Number.parseFloat(rawNum);

    // Reject immediately if the result is NaN or |result| > 1.8e308
    if (!Number.isFinite(result) || Math.abs(result) > 1.7e308) return;

    // Reject if the string is ill-formed, including if it contains invalid trailing characters.
    if (!FLOAT_REGEX.test(rawNum)) return;

    // Reject if there are more than 15 significant decimal digits or if the exponent is less than -308.
    // NB: This is a bit conservative, and will reject some numbers that can be represented exactly.
    // However it never accepts numbers that cannot be represented exactly.
    const len = rawNum.length;
    let totalDigits = 0;
    let leadingZeroes = 0;
    let trailingZeroes = 0;
    for (let pos = 0; pos < len; ++pos) {
        let charCode = rawNum.charCodeAt(pos);
        if (charCode === LOWERCASE_E || charCode === UPPERCASE_E) break;
        if (charCode < ZERO_DIGIT || charCode > NINE_DIGIT) continue;
        if (charCode === ZERO_DIGIT) {
            ++trailingZeroes;
            if (leadingZeroes === totalDigits) ++leadingZeroes;
        }
        else {
            trailingZeroes = 0;
        }
        ++totalDigits;
    }

    // NB: if the string is all zeros, then leading/trailing will overlap, but that doesn't matter for the check here.
    let significantDigits = totalDigits - leadingZeroes - trailingZeroes;
    if (significantDigits > 15) return;

    // Reject if the result is zero but there are non-zero digits in the string. The number is too small to represent.
    if (result === 0 && significantDigits > 0) return;

    // The string representation passes all checks. Return the resulting number.
    return result;
}


const FLOAT_REGEX = /^[+-]?(?:(?:[0-9]+(?:[.][0-9]*)?(?:[eE][+-]?[0-9]+)?)|(?:[.][0-9]+(?:[eE][+-]?[0-9]+)?))$/;
const LOWERCASE_E = 'e'.charCodeAt(0);
const UPPERCASE_E = 'E'.charCodeAt(0);
const ZERO_DIGIT = '0'.charCodeAt(0);
const NINE_DIGIT = '9'.charCodeAt(0);
