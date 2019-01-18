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
            await index.transform(null, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is undefined', async () => {
        try {
            await index.transform(null, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is empty string', async () => {
        try {
            await index.transform(null, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is null and outputFilePath is valid string', async () => {
        try {
            await index.transform(null, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is null', async () => {
        try {
            await index.transform(undefined, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is undefined', async () => {
        try {
            await index.transform(undefined, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is empty string', async () => {
        try {
            await index.transform(undefined, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is undefined and outputFilePath is valid string', async () => {
        try {
            await index.transform(undefined, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is null', async () => {
        try {
            await index.transform('', null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is undefined', async () => {
        try {
            await index.transform('', undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is empty string', async () => {
        try {
            await index.transform('', '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is empty string and outputFilePath is valid string', async () => {
        try {
            await index.transform('', validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidInputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is null', async () => {
        try {
            await index.transform(validInputFilePath, null);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is undefined', async () => {
        try {
            await index.transform(validInputFilePath, undefined);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });

    test('Should reject when inputFilePath is a valid string and outputFilePath is empty string', async () => {
        try {
            await index.transform(validInputFilePath, '');
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, invalidOutputFileErrorMessage);
        }
    });
});
