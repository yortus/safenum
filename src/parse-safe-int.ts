import {tryParseSafeInt} from './try-parse-safe-int';


export function parseSafeInt(rawNum: string): number {
    let result = tryParseSafeInt(rawNum);
    if (result !== undefined) return result;
    throw new RangeError(`The string ${JSON.stringify(rawNum)} cannot be parsed to a safe integer.`);
}
