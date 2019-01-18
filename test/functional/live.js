'use strict';

const { assert } = require('chai');
const fs = require('fs');
const sinon = require('sinon');
const { Builder, Parser } = require('xml2js');

const index = require('../../index');
const utils = require('../utils');

suite('live', () => {
    test('Should foo', async () => {
        const inputFile = 'C:\\dev\\cobertura-transform\\test\\fixtures\\multi-class\\cobertura3.xml';
        const outputFile = 'C:\\dev\\cobertura-transform\\test\\fixtures\\cobertura4.xml';
        await index.transformCoberturaThreeToFour(inputFile, outputFile);
    });
});
