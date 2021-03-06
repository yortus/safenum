const Benchmark = require('benchmark');
const safenum = require('../dist');


let suite = new Benchmark.Suite();
const rawNums = getRawNums();

// Add tests
suite.add('tryParseInt', () => {
    var rawNum = rawNums[Math.floor(Math.random() * rawNums.length)];
    safenum.tryParseSafeInt(rawNum);
})
.add('tryParseFloat', () => {
    let rawNum = rawNums[Math.floor(Math.random() * rawNums.length)];
    safenum.tryParseSafeFloat(rawNum);
})

// Add listeners
.on('cycle', event => {
    console.log(String(event.target));
})
.on('complete', () => {
    console.log('Finished.');
})

// Run benchmarks
.run();


function getRawNums() {
    return [
        '+',
        '-',
        '.',
        '0-',
        '123+',
        'e123',
        'a',
        '$33',
        '123foo',
        '0x30',
        '1\n2',
        '+.',
        '-.',
        '0.e-',
        '0e+',
        'e4',
        '.e4',
        '3.1.4',
        '-3.1.4',
        '3..14',
        '1.23e5.3',
        '1.23e-.3',
        '$1.23e4',
        '=1.23e4',
        '1.23e4foo',
        '1.23e4e',
        '1.1\n2.2',
        '1000000000000000000000000000000000000000',
        JSON.stringify(2**53 + 5),
        '9007199254740992',
        '9007199254740993',
        '-9007199254740992',
        '-9007199254740993',
        '0',
        '-1',
        '+1',
        '+0',
        '+154',
        '-000',
        '+000',
        '0000000000000000000000000000000000000000',
        '0000000000000000000000000000000000000001',
        '00003',
        '1234567890',
        '-9999999999',
        '10000000000000',
        '-10000000000000',
        JSON.stringify(2**53 - 5),
        JSON.stringify(-(2 ** 40)),
        '9007199254740991',
        '-9007199254740991',
        '-1.2345678901234567e-300',
        '+1.2345678901234567e-300',
        '1.2345678901234567e-300',
        '1e-1000',
        '0.100000000000001e-309',
        '1.00000000000001e-310',
        '0.0100000000000001e-308',
        '1e1000',
        '1.8e308',
        '0.18e309',
        '18e307',
        '1.79999999999999e308',
        '0000011111222223333344444.00000',
        '00000111112222233333.44444',
        '10000000000000000000.00001',
        '10000000000000001000.00000',
        '0000100000000000000010000.00000',
        '0000000001000000000000000.01000',
        '.1',
        '0.',
        '+.0',
        '-0.',
        '123.',
        '.123',
        '123.e53',
        '.0e+0',
        '1E5',
        '1E-5',
        '1E+5',
        '1.0',
        '123e4',
        '1e-5',
        '3.14',
        '0.01',
        JSON.stringify(-2e20),
        '-1.234567890e-300',
        '+1.234567890e-300',
        '1.234567890e-300',
        '-1.234567890123456e-300',
        '+1.234567890123456e-300',
        '1.234567890123456e-300',
        '1.7e-308',
        '0.17e-309',
        '17e-307',
        '1.69999999999999e-308',
        '1.69000000000001e-308',
        '1.70000000000001e308',
        '1.7e308',
        '0.17e309',
        '17e307',
        '1.69999999999999e308',
        '1.69000000000001e308',
        '00000111112222233333.00000',
        '00000000000000000000.00000',
        '10000000000000000000.00000',
        '00000010000000000000.00000',
        '00000000000000010000.00000',
        '00000000000000000001.00000',
        '00000000000000000000.10000',
        '00000000000000000000.00001',
        '10000000000000100000.00000',
        '0000010000000000000100000.00000',
        '0000000000100000000000001.00000',
        '10000000000000010000.00000',
        '0000010000000000000010000.00000',
        '0000000000100000000000000.10000',
        '0000000001000000000000000.10000',
        '1237456',
        '896',
        '856348127346',
        '0012312321',
        '7867000000',
        '-3',
        '-782783',
        '-770000000000',
        '-9999988888',
        '-67823467823',
    ];
}
