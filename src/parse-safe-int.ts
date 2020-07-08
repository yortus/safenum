import {tryParseSafeInt} from './try-parse-safe-int';


/**
 * Parses the string `rawNum` as an integer number. If parsing consumes the entire string and the resulting value is a
 * [SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger),
 * then the number is returned, otherwise throws a `RangeError`. If `rawNum` is not a string, a `TypeError` is thrown.
 */
export function parseSafeInt(rawNum: string): number {

    // If the input is not a string, throw a TypeError.
    if (typeof rawNum !== 'string') throw new TypeError(`Expected a string value, but got ${JSON.stringify(rawNum)}`);;

    // Delegate to `tryParseSafeInt`, and either return the number, or throw a RangeError if conversion fails.
    let result = tryParseSafeInt(rawNum);
    if (result !== undefined) return result;
    throw new RangeError(`The string ${JSON.stringify(rawNum)} cannot be parsed to a safe integer.`);
}
