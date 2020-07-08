import {tryParseSafeFloat} from './try-parse-safe-float';


/**
 * Parses the string `rawNum` as a floating point number. If parsing consumes the entire string and the resulting value
 * can be represented with no loss of precision, then the number is returned, otherwise throws a `RangeError`. If
 * `rawNum` is not a string, a `TypeError` is thrown.
 */
export function parseSafeFloat(rawNum: string): number {

    // If the input is not a string, throw a TypeError.
    if (typeof rawNum !== 'string') throw new TypeError(`Expected a string value, but got ${JSON.stringify(rawNum)}`);;

    // Delegate to `tryParseSafeFloat`, and either return the number, or throw a RangeError if conversion fails.
    let result = tryParseSafeFloat(rawNum);
    if (result !== undefined) return result;
    throw new RangeError(`The string ${JSON.stringify(rawNum)} cannot be parsed to a number without loss of precision.`);
}
