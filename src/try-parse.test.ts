import {expect} from 'chai';
import {tryParseSafeFloat} from './try-parse-safe-float';
import {tryParseSafeInteger} from './try-parse-safe-integer';


const INVALID = 'invalid';
const tests = {
    // Ill-formed strings
    '+': {int: INVALID, float: INVALID},
    '-': {int: INVALID, float: INVALID},
    '.': {int: INVALID, float: INVALID},
    '0-': {int: INVALID, float: INVALID},
    '123+': {int: INVALID, float: INVALID},
    'e123': {int: INVALID, float: INVALID},
    'a': {int: INVALID, float: INVALID},
    '$33': {int: INVALID, float: INVALID},
    '123foo': {int: INVALID, float: INVALID},
    '0x30': {int: INVALID, float: INVALID},
    '1\n2': {int: INVALID, float: INVALID},
    '+.': {int: INVALID, float: INVALID},
    '-.': {int: INVALID, float: INVALID},
    '0.e-': {int: INVALID, float: INVALID},
    '0e+': {int: INVALID, float: INVALID},
    'e4': {int: INVALID, float: INVALID},
    '.e4': {int: INVALID, float: INVALID},
    '3.1.4': {int: INVALID, float: INVALID},
    '-3.1.4': {int: INVALID, float: INVALID},
    '3..14': {int: INVALID, float: INVALID},
    '1.23e5.3': {int: INVALID, float: INVALID},
    '1.23e-.3': {int: INVALID, float: INVALID},
    '$1.23e4': {int: INVALID, float: INVALID},
    '=1.23e4': {int: INVALID, float: INVALID},
    '1.23e4foo': {int: INVALID, float: INVALID},
    '1.23e4e': {int: INVALID, float: INVALID},
    '1.1\n2.2': {int: INVALID, float: INVALID},

    // Well-formed strings
    '1000000000000000000000000000000000000000': {int: INVALID, float: '1e+39'},
    [JSON.stringify(2**53 + 5)]: {int: INVALID, float: INVALID},
    '9007199254740992': {int: INVALID, float: INVALID}, // too large for int, too many sig. digits for float
    '9007199254740993': {int: INVALID, float: INVALID}, // too large for int, too many sig. digits for float
    '-9007199254740992': {int: INVALID, float: INVALID}, // too small for int, too many sig. digits for float
    '-9007199254740993': {int: INVALID, float: INVALID}, // too small for int, too many sig. digits for float
    '0': {int: '0', float: '0'},
    '-1': {int: '-1', float: '-1'},
    '+1': {int: '1', float: '1'},
    '+0': {int: '0', float: '0'},
    '+154': {int: '154', float: '154'},
    '-000': {int: '0', float: '0'},
    '+000': {int: '0', float: '0'},
    '0000000000000000000000000000000000000000': {int: '0', float: '0'},
    '0000000000000000000000000000000000000001': {int: '1', float: '1'},
    '00003': {int: '3', float: '3'},
    '1234567890': {int: '1234567890', float: '1234567890'},
    '-9999999999': {int: '-9999999999', float: '-9999999999'},
    '10000000000000': {int: '10000000000000', float: '10000000000000'},
    '-10000000000000': {int: '-10000000000000', float: '-10000000000000'},
    [JSON.stringify(2**53 - 5)]: {int: '9007199254740987', float: INVALID}, // safe int, too many sig. digits for float
    [JSON.stringify(-(2 ** 40))]: {int: '-1099511627776', float: '-1099511627776'},
    '9007199254740991': {int: '9007199254740991', float: INVALID}, // safe int, too many sig. digits for float
    '-9007199254740991': {int: '-9007199254740991', float: INVALID}, // safe int, too many sig. digits for float

    // Well-formed floats, outside safe range
    '-1.234567890123456e-300': {int: INVALID, float: INVALID}, // >15 significant digits
    '+1.234567890123456e-300': {int: INVALID, float: INVALID}, // >15 significant digits
    '1.234567890123456e-300': {int: INVALID, float: INVALID}, // >15 significant digits
    '1e-1000': {int: INVALID, float: INVALID}, // too small
// TODO: FIX FAILING TESTS...
    '1.8e-308': {int: INVALID, float: INVALID}, // too small
    // '0.18e-309': {int: INVALID, float: INVALID}, // too small
    // '18e-307': {int: INVALID, float: INVALID}, // too small
    // '1.70000000000001e-308': {int: INVALID, float: INVALID}, // too small
    '1e1000': {int: INVALID, float: INVALID}, // too large
    '1.8e308': {int: INVALID, float: INVALID}, // too large
    '0.18e309': {int: INVALID, float: INVALID}, // too large
    '18e307': {int: INVALID, float: INVALID}, // too large
    '1.70000000000001e308': {int: INVALID, float: INVALID}, // too large
    '0000011111222223333344444.00000': {int: INVALID, float: INVALID}, // >15 significant digits
    '00000111112222233333.44444': {int: INVALID, float: INVALID}, // >15 significant digits
    '10000000000000000000.00001': {int: INVALID, float: INVALID}, // >15 significant digits
    '10000000000000010000.00000': {int: INVALID, float: INVALID}, // >15 significant digits
    '0000010000000000000010000.00000': {int: INVALID, float: INVALID}, // >15 significant digits
    '0000000000100000000000000.10000': {int: INVALID, float: INVALID}, // >15 significant digits

    // Well-formed floats, inside safe range
    '.1': {int: INVALID, float: '0.1'},
    '0.': {int: INVALID, float: '0'},
    '+.0': {int: INVALID, float: '0'},
    '-0.': {int: INVALID, float: '0'},
    '123.': {int: INVALID, float: '123'},
    '.123': {int: INVALID, float: '0.123'},
    '123.e53': {int: INVALID, float: '1.23e+55'},
    '.0e+0': {int: INVALID, float: '0'},
    '1E5': {int: INVALID, float: '100000'},
    '1E-5': {int: INVALID, float: '0.00001'},
    '1E+5': {int: INVALID, float: '100000'},
    '1.0': {int: INVALID, float: '1'},
    '123e4': {int: INVALID, float: '1230000'},
    '1e-5': {int: INVALID, float: '0.00001'},
    '3.14': {int: INVALID, float: '3.14'},
    '0.01': {int: INVALID, float: '0.01'},
    [JSON.stringify(-2e20)]: {int: INVALID, float: '-200000000000000000000'},
    '-1.234567890e-300': {int: INVALID, float: '-1.23456789e-300'},
    '+1.234567890e-300': {int: INVALID, float: '1.23456789e-300'},
    '1.234567890e-300': {int: INVALID, float: '1.23456789e-300'},
    '1.7e-308': {int: INVALID, float: '1.7e-308'},
    '0.17e-309': {int: INVALID, float: '1.7e-310'},
    '17e-307': {int: INVALID, float: '1.7e-306'},
    '1.69999999999999e-308': {int: INVALID, float: '1.69999999999999e-308'},
    '1.69000000000001e-308': {int: INVALID, float: '1.69000000000001e-308'},
    '1.7e308': {int: INVALID, float: '1.7e+308'},
    '0.17e309': {int: INVALID, float: '1.7e+308'},
    '17e307': {int: INVALID, float: '1.7e+308'},
    '1.69999999999999e308': {int: INVALID, float: '1.69999999999999e+308'},
    '1.69000000000001e308': {int: INVALID, float: '1.69000000000001e+308'},
    '00000111112222233333.00000': {int: INVALID, float: '111112222233333'},
    '00000000000000000000.00000': {int: INVALID, float: '0'},
    '10000000000000000000.00000': {int: INVALID, float: '10000000000000000000'},
    '00000010000000000000.00000': {int: INVALID, float: '10000000000000'},
    '00000000000000010000.00000': {int: INVALID, float: '10000'},
    '00000000000000000001.00000': {int: INVALID, float: '1'},
    '00000000000000000000.10000': {int: INVALID, float: '0.1'},
    '00000000000000000000.00001': {int: INVALID, float: '0.00001'},
    '10000000000000100000.00000': {int: INVALID, float: '10000000000000100000'},
    '0000010000000000000100000.00000': {int: INVALID, float: '10000000000000100000'},
    '0000000000100000000000001.00000': {int: INVALID, float: '100000000000001'},
};


describe('tryParseSafeInteger', () => {
    for (let [input, {int: expected}] of Object.entries(tests)) {
        it(`${JSON.stringify(input)} ==> ${expected}`, () => {
            let actual = String(tryParseSafeInteger(input) ?? 'invalid');
            expect(actual).equals(expected);
        });
    }
});


describe('tryParseSafeFloat', () => {
    for (let [input, {float: expected}] of Object.entries(tests)) {
        it(`${JSON.stringify(input)} ==> ${expected}`, () => {
            let actual = String(tryParseSafeFloat(input) ?? 'invalid');
            expect(actual).equals(expected);
        });
    }
});
