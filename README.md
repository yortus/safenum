# safenum

Converting a string to a number using JavaScript's built-in `parseInt` or `parseFloat` functions may lead to silent failures. For example, invalid characters in the string may be silently ignored, or the resulting number may have less precision than the string representation. This might be fine for some applications, but in other cases an explicit error would be more useful.

With all functions provided by `safenum`, conversions succeed only when the entire string is consumed during parsing, and the resulting number can be represented exactly as a JavaScript number. If the string contains additional characters, or if the resulting number loses any precision, then conversion fails.

#### Installation

```shell
npm install safenum
```

#### Usage
```ts
import {parseSafeInt} from 'safenum';

let num1 = parseSafeInt('1337');                // num1 is set to 1337
let num2 = parseSafeInt('123.0');               // throws (didn't consume entire string)
let num3 = parseSafeInt('9007199254740992');    // throws (number is not a SAFE_INTEGER)
```

#### API

```ts
function parseSafeInt(rawNum: string): number
```
Parses the string `rawNum` as an integer number. If parsing consumes the entire string and the resulting value is a [SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger), then the number is returned. Otherwise throws a `RangeError`.

```ts
function parseSafeFloat(rawNum: string): number
```
Parses the string `rawNum` as a floating point number. If parsing consumes the entire string and the resulting value can be represented with no loss of precision, then the number is returned. Otherwise throws a `RangeError`.

```ts
function tryParseSafeInt(rawNum: string): number
```
Parses the string `rawNum` as an integer number. If parsing consumes the entire string and the resulting value is a [SAFE_INTEGER](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger), then the number is returned. Otherwise returns `undefined`.

```ts
function tryParseSafeFloat(rawNum: string): number
```
Parses the string `rawNum` as a floating point number. If parsing consumes the entire string and the resulting value can be represented with no loss of precision, then the number is returned. Otherwise returns `undefined`.

#### Development

```shell
# build from TypeScript source
npm run build

# run unit tests
npm test

# run benchmarks
npm run bench
```
