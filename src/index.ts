/**
 * Copyright 2018 Alexander Sychev
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 * DEALINGS IN THE SOFTWARE.
 */

/** Binary number system radix value */
export const BINARY_RADIX: number = 2;

/** Hex number system radix value */
export const HEX_RADIX: number = 16;

/** Decimal number system radix value */
export const DECIMAL_RADIX: number = 10;

/** Minimal available radix value */
export const MIN_RADIX_VALUE: number = BINARY_RADIX;

/** Maximal available radix value */
export const MAX_RADIX_VALUE: number = 36;

/** Returns "true" if numeric value is correct radix value */
export function isRadixValue(radix: number): boolean {
    return Number.isInteger(radix) && radix >= MIN_RADIX_VALUE && radix <= MAX_RADIX_VALUE;
}

// Assertion functions

function assertValue(value: number | string) {
    if (typeof value !== 'number' && typeof value !== 'string') {
        throw new Error('First argument ("value") must be number or string');
    }
    if (typeof value === 'number' && !Number.isInteger(value)) {
        throw new Error('Value must be integer');
    }
}

function assertRadix(radix: any, type: 'from' | 'to'): void {
    if (!isRadixValue(radix)) {
        throw new Error(`Radix to convert ${type} is not a radix value (integer from 2 to 36)`);
    }
}

function assertNumberValue(value: number | string, radix: number): void {
    if (typeof value === 'number' && radix !== DECIMAL_RADIX) {
        throw new Error('Value with type "number" can be converted only from decimal system');
    }
}

/** Common function to convert value from one positional system to another */
export function convert(value: number | string, from: number, to: number): string {
    assertValue(value);
    assertRadix(from, 'from');
    assertRadix(to, 'to');
    assertNumberValue(value, from);
    return parseInt(String(value).toUpperCase(), from).toString(to).toUpperCase();
}
