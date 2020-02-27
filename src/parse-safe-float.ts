import {tryParseSafeFloat} from './try-parse-safe-float';


export function parseSafeFloat(rawNum: string): number {
    let result = tryParseSafeFloat(rawNum);
    if (result !== undefined) return result;
    throw new Error(`The string ${JSON.stringify(rawNum)} cannot be parsed to a number without loss of precision.`);
}
