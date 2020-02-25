export function tryParseSafeInteger(rawNum: string): number | undefined {

    // Construct the number digit-by-digit.
    let result = 0;
    const len = rawNum.length;
    let isNegative = len > 0 && rawNum.charAt(0) === '-';
    if (len < (isNegative ? 2 : 1)) return;
    for (let i = isNegative ? 1 : 0; i < len; ++i) {
        let digit = rawNum.charCodeAt(i) - 0x30;
        if (digit < 0 || digit > 9) return;
        result = result * 10 + digit; // will never throw, but may overflow to Infinity
    }
    if (isNegative) result = -result;

    // Ensure the result is a safe integer.
    // See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger
    if (!Number.isSafeInteger(result)) return;
    return result;
}
