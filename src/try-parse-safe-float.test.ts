import {expect} from 'chai';
import {tryParseSafeFloat} from './try-parse-safe-float';


describe('tryParseSafeFloat', () => {
    const tests = [
        ['0', 0],
        ['a', undefined],
        // TODO: should fail but doesn't... ['1a', undefined],
        ['-1.234567890e-311', -1.234567890e-311],
        ['-1.234567890123456e-311', undefined],
    ] as const;

    const tests2 = [
        ['0', 0],
        ['-1', -1],
        ['-000', -0],
        ['+1', undefined],
        ['a', undefined],
        ['$33', undefined],
        ['-', undefined],
        ['123x', undefined],
        ['00003', 3],
        ['0x30', undefined],
        ['1234567890', 1234567890],
        ['-9999999999', -9999999999],
        ['3.14', undefined],
        ['0.01', undefined],
        ['1.0', undefined],
        ['10000000000000', 10_000_000_000_000],
        ['-10000000000000', -10_000_000_000_000],
        [JSON.stringify(2**53 + 5), undefined],
        [JSON.stringify(2**53 - 5), 9007199254740987],
        [JSON.stringify(-(2 ** 40)), -1099511627776],
        [JSON.stringify(-2e20), undefined],
        ['9007199254740991', 9007199254740991], // Number.MAX_SAFE_INTEGER (2^53 - 1)
        ['9007199254740992', undefined],
        ['9007199254740993', undefined],
        ['-9007199254740991', -9007199254740991], // Number.MIN_SAFE_INTEGER (-2^53)
        ['-9007199254740992', undefined],
        ['-9007199254740993', undefined],
    ] as const;

    for (let [input, expected] of tests) {
        it(`${JSON.stringify(input)} ==> ${expected}`, () => {
            let actual = tryParseSafeFloat(input);
            expect(actual).equals(expected);
        });
    }
});
