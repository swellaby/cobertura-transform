'use strict';

const { assert } = require('chai');
const index = require('../../index');
const utils = require('../utils');

suite('invalid parameters Tests:', () => {
    const validInputFilePath = utils.validInputFilePath;
    const validOutputFilePath = utils.validOutputFilePath;
    const invalidInputFileErrorMessage = utils.invalidInputFileErrorMessage;
    const invalidOutputFileErrorMessage = utils.invalidOutputFileErrorMessage;

    test('Should reject when inputFilePath is null and outputFilePath is null', async () => {
        try {
            await index.transformCoberturaThreeToFour(null, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is undefined', async () => {
        try {
            await index.transformCoberturaThreeToFour(null, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is empty string', async () => {
        try {
            await index.transformCoberturaThreeToFour(null, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is valid string', async () => {
        try {
            await index.transformCoberturaThreeToFour(null, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is null', async () => {
        try {
            await index.transformCoberturaThreeToFour(undefined, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is undefined', async () => {
        try {
            await index.transformCoberturaThreeToFour(undefined, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is empty string', async () => {
        try {
            await index.transformCoberturaThreeToFour(undefined, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is valid string', async () => {
        try {
            await index.transformCoberturaThreeToFour(undefined, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is null', async () => {
        try {
            await index.transformCoberturaThreeToFour('', null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is undefined', async () => {
        try {
            await index.transformCoberturaThreeToFour('', undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is empty string', async () => {
        try {
            await index.transformCoberturaThreeToFour('', '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is valid string', async () => {
        try {
            await index.transformCoberturaThreeToFour('', validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is null', async () => {
        try {
            await index.transformCoberturaThreeToFour(validInputFilePath, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is undefined', async () => {
        try {
            await index.transformCoberturaThreeToFour(validInputFilePath, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is empty string', async () => {
        try {
            await index.transformCoberturaThreeToFour(validInputFilePath, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });
});
