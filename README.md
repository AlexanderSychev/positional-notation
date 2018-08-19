# positional-notation

Simple library to convert numbers between any positional number systems with radixes from 2 to 36.

## Installation

```bash
# By Yarn
yarn add positional-notation --save
# Or by NPM
npm install positional-notation --save
```

All entities below can exported from module's root.

## Constants

* Most used positional number systems radixes:
  * `BINARY_RADIX` - radix for binary number system (equals `2`);
  * `HEX_RADIX` - radix for hexadecimal number system (equals `16`);
  * `DECIMAL_RADIX` - radix for decimal number system (equals `10`);
* Radix values limits:
  * `MIN_RADIX_VALUE` - minimal available radix value (equals `BINARY_RADIX`);
  * `MAX_RADIX_VALUE` - maximal available radix value (equals `MAX_RADIX_VALUE`);

## isRadixValue(value: number): boolean;

Special function to check value to be a radix (integer from `MIN_RADIX_VALUE` to `MAX_RADIX_VALUE`)

```javascript
const { isRadixValue } = require('positional-notation');

isRadixValue({}); // returns "false";
isRadixValue(12.5); // returns "false";
isRadixValue(40); // returns "false";
isRadixValue(3); // returns "true";
isRadixValue(36); // returns "true";
```

## convert(value: number | string, from: number, to: number): string

Function which converts number from one numeric system to another. Arguments:

* `value` - `number` or `string`, value to convert;`
* `from` - `number`, source value radix;
* `to` - `number`, converted value radix;

Value must be `number` or `string`, or will be thrown an exception.
If `value` argument has type `number`, argument `from` must be equal `10`, or will be thrown an exception.
Arguments `from` and `to` must be correct radixes values (function `isRadixValue` must return `true` for them) or will be thrown an exception.

Example:

```javascript
const { convert } = require('positional-notation');
convert(10, 10, 2); // Returns '1010'
convert(10, 10, 16) // Returns 'A'
convert('1010', 2, 10) // Returns '10'
convert('1010', 2, 16) // Returns 'A'
```

You can also look at file `src/test.ts` at module's directory to look another samples (TypeScript).

## Browser usage

For browsers you can use bundle `/lib/positional-notation.min.js` at module's directory. It's provided all entities at `PositionalNotation` global variable. If you use Webpack, you can add this library to `externals`:

```javascript
// ...

module.exports = {
    // ...
    // other configuration
    // ...
    externals: {
        // ...
        // other externals
        // ...
        'positional-notation': 'PositionalNotation',
        // ...
        // other externals
        // ...
    }
};
```
