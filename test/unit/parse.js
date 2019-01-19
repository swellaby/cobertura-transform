'use strict';

const { assert } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { Builder, Parser } = require('xml2js');

const index = require('../../index');
const utils = require('../utils');

suite('parseXml Tests:', () => {
    let writeFileStub;
    let parseStringStub;
    let buildObjectStub;
    const validInputFilePath = utils.validInputFilePath;
    const validOutputFilePath = utils.validOutputFilePath;
    const fullErrorMessage = utils.defaultTransformFailureFullErrorMessage;
    const errorMessageDetails = utils.defaultTransformFailureErrorMessageDetails;
    const baseErrorMessage = utils.defaultTransformFailureBaseErrorMessage;
    const contents = utils.sampleInputContents;

    setup(() => {
        buildObjectStub = sinon.stub(Builder.prototype, 'buildObject');
        parseStringStub = sinon.stub(Parser.prototype, 'parseString').yields(null, {});
        writeFileStub = sinon.stub(fs, 'writeFile').yields(null);
        sinon.stub(fs, 'readFile').yields(null, contents);
    });

    teardown(() => {
        sinon.restore();
    });

    test('Should reject with error when parseString errors with details', async () => {
        parseStringStub.yields(new Error(errorMessageDetails), null);
        try {
            await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, fullErrorMessage);
            assert.isFalse(writeFileStub.called);
        }
    });

    test('Should reject with error when parseString errors without details', async () => {
        parseStringStub.yields(new Error(), null);
        try {
            await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
            assert.isFalse(true);
        } catch (err) {
            assert.deepEqual(err.message, baseErrorMessage);
            assert.isFalse(writeFileStub.called);
        }
    });

    suite('invalid XML', () => {
        const invalidCoberturaFullErrorMessage = utils.invalidCoberturaXmlFullErrorMessage;

        test('Should reject with error when parsed XML is null', async () => {
            parseStringStub.yields(null, null);
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });

        test('Should reject with error when parsed XML is undefined', async () => {
            parseStringStub.yields(null, undefined);
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });

        test('Should reject with error when parsed XML is missing coverage node', async () => {
            parseStringStub.yields(null, {});
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });

        test('Should reject with error when parsed XML is missing packages node', async () => {
            parseStringStub.yields(null, { coverage: {} });
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });


        test('Should reject with error when parsed XML packages node is null', async () => {
            parseStringStub.yields(null, { coverage: { packages: null } });
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });

        test('Should reject with error when parsed XML packages node is not an array', async () => {
            parseStringStub.yields(null, { coverage: { packages: 2 } });
            try {
                await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
                assert.isFalse(true);
            } catch (err) {
                assert.deepEqual(err.message, invalidCoberturaFullErrorMessage);
                assert.isFalse(writeFileStub.called);
            }
        });
    });

    suite('valid XML', () => {
        test('Should handle XML with an empty packages node', async () => {
            parseStringStub.yields(null, utils.emptyPackagesCoberturaReport);
            await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
            assert.isTrue(buildObjectStub.calledWithExactly(utils.emptyPackagesCoberturaReport));
        });

        test('Should handle valid Cobertura 3 report', async () => {
            const report = utils.getReportCopy();
            parseStringStub.yields(null, report);
            await index.transformCoberturaThreeToFour(validInputFilePath, validOutputFilePath);
            assert.deepEqual(report.coverage.$['lines-valid'], 20);
            assert.deepEqual(report.coverage.$['lines-covered'], 17);
            assert.isTrue(buildObjectStub.calledWithExactly(report));
        });
    });
});
