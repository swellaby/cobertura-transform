'use strict';

const { assert } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { Builder, Parser } = require('xml2js');

const index = require('../../index');
const utils = require('../utils');

suite('parseXml Tests:', () => {
    let writeFileStub;
    let buildObjectStub;
    const validInputFilePath = utils.validInputFilePath;
    const validOutputFilePath = utils.validOutputFilePath;
    const fullErrorMessage = utils.defaultTransformFailureFullErrorMessage;
    const errorMessageDetails = utils.defaultTransformFailureErrorMessageDetails;
    const baseErrorMessage = utils.defaultTransformFailureBaseErrorMessage;
    const contents = utils.sampleInputContents;
    let report;

    setup(() => {
        report = utils.getReportCopy();
        buildObjectStub = sinon.stub(Builder.prototype, 'buildObject');
        sinon.stub(Parser.prototype, 'parseString').yields(null, report);
        writeFileStub = sinon.stub(fs, 'writeFile').yields(null);
        sinon.stub(fs, 'readFile').yields(null, contents);
    });

    teardown(() => {
        sinon.restore();
    });

    suite('writeFile errors:', () => {
        test('Should reject with error when writeFile errors with details', async () => {
            writeFileStub.yields(new Error(errorMessageDetails));
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, fullErrorMessage);
            }
        });

        test('Should reject with error when writeFile errors without details', async () => {
            writeFileStub.yields(new Error());
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, baseErrorMessage);
            }
        });
    });

    test('Should write correct content to correct path', async () => {
        const xml = '<foo>';
        buildObjectStub.callsFake(() => xml);
        await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
        assert.isTrue(writeFileStub.calledWith(validOutputFilePath, xml));
    });
});
