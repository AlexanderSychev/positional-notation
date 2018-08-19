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

import { convert, isRadixValue, MIN_RADIX_VALUE, MAX_RADIX_VALUE } from './index';
import * as assert from 'assert';

function throwsExceptionWithMessage(testCase: () => any, message: string): boolean {
    let errorMessage: string;
    let wasThrown: boolean;
    try {
        testCase();
        wasThrown = false;
    } catch(error) {
        errorMessage = (<Error>error).message;
        wasThrown = true;
    }
    return wasThrown && errorMessage === message;
}

describe(
    'Function "isRadixValue" returns "true" for all integer values from "MIN_RADIX_VALUE" to "MAX_RADIX_VALUE"',
    () => {
    for (let radix = MIN_RADIX_VALUE; radix <= MAX_RADIX_VALUE; radix++) {
        it(`isRadixValue(${radix}) === true`, () => {
            assert(isRadixValue(MIN_RADIX_VALUE) === true);
        });
    }
});

describe('Function "isRadixValue returns "false" to another values', () => {
    it('Not numeric argument returns "false"', () => {
        assert(isRadixValue(<any>{}) === false);
    });
    it('Float argument returns "false"', () => {
        assert(isRadixValue(12.92) === false);
    });
    it('Integer smaller than "MIN_RADIX_VALUE" returns "false"', () => {
        assert(isRadixValue(1) === false);
    });
    it('Integer bigger than "MAX_RADIX_VALUE" returns "false"', () => {
        assert(isRadixValue(38) === false);
    });
});

describe('Check decimals converting by "convert" function', () => {
    it('Decimal "10" converts to binary "1010"', () => {
        assert(convert(10, 10, 2) === '1010');
    });
    it('Decimal "10" converts to hex "A"', () => {
        assert(convert(10, 10, 16) === 'A');
    });
});

describe('Check binaries converting by "convert" function', () => {
    it('Binary "1010" converts to decimal "10"', () => {
        assert(convert('1010', 2, 10) === '10');
    });
    it('Decimal "1010" converts to hex "A"', () => {
        assert(convert('1010', 2, 16) === 'A');
    });
});

describe('Check hex converting by "convert" function', () => {
    it('Hex "A" converts to decimal "10"', () => {
        assert(convert('A', 16, 10) === '10');
    });
    it('Hex "A" converts to binary "1010"', () => {
        assert(convert('A', 16, 2) === '1010');
    });
});

describe('Check exceptions, throwing by "convert" function', () => {
    it('Throws exception if value not a number or string ("convert({}, 10, 2)")', () => {
        assert(throwsExceptionWithMessage(
            () => convert(<any>{}, 10, 2),
            'First argument ("value") must be number or string'
        ));
    });
    it('Throws exception if number value is not integer ("convert(1.5, 10, 2)")', () => {
        assert(throwsExceptionWithMessage(
            () => convert(1.5, 10, 2),
            'Value must be integer'
        ));
    });
    it('Throws exception if radix to convert from is not correct ("convert(10, 0, 2)")', () => {
        assert(throwsExceptionWithMessage(
            () => convert(10, 0, 2),
            'Radix to convert from is not a radix value (integer from 2 to 36)'
        ));
    });
    it('Throws exception if radix to convert to is not correct ("convert(10, 10, 37)")', () => {
        assert(throwsExceptionWithMessage(
            () => convert(10, 10, 37),
            'Radix to convert to is not a radix value (integer from 2 to 36)'
        ));
    });
    it('Throws exception if numeric tries to convert not from decimal system ("convert(12, 2, 16)")', () => {
        assert(throwsExceptionWithMessage(
            () => convert(12, 2, 16),
            'Value with type "number" can be converted only from decimal system'
        ));
    });
});
