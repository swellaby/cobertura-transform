'use strict';

const { assert } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { Builder, Parser } = require('xml2js');

const index = require('../../index');
const utils = require('../utils');

suite('loadFileContents Tests:', () => {
    let readFileStub;
    let parseStringStub;
    const validInputFilePath = utils.validInputFilePath;
    const validOutputFilePath = utils.validOutputFilePath;
    const fullErrorMessage = utils.defaultTransformFailureFullErrorMessage;
    const errorMessageDetails = utils.defaultTransformFailureErrorMessageDetails;
    const baseErrorMessage = utils.defaultTransformFailureBaseErrorMessage;

    setup(() => {
        sinon.stub(Builder.prototype, 'buildObject');
        parseStringStub = sinon.stub(Parser.prototype, 'parseString').yields(null, {});
        sinon.stub(fs, 'writeFile').yields(null);
        readFileStub = sinon.stub(fs, 'readFile').yields(null, '');
    });

    teardown(() => {
        sinon.restore();
    });

    test('Should reject with error when readFile errors with details', async () => {
        readFileStub.yields(new Error(errorMessageDetails), null);
        try {
            await index.transform(validInputFilePath, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, fullErrorMessage);
        }
    });

    test('Should reject with error when readFile errors without details', async () => {
        readFileStub.yields(new Error(), null);
        try {
            await index.transform(validInputFilePath, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, baseErrorMessage);
            assert.isFalse(parseStringStub.called);
        }
    });

    test('Should being parsing when readFile returns contents', async () => {
        const contents = '<xml></xml>';
        readFileStub.yields(null, contents);
        await index.transform(validInputFilePath, validOutputFilePath);
        assert.isTrue(parseStringStub.calledWith(contents));
    });
});
