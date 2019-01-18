'use strict';

const fs = require('fs');
const { Parser, Builder } = require('xml2js');

const loadFileContents = (filePath) => new Promise((resolve, reject) => {
    fs.readFile(filePath, { encoding: 'utf-8' }, (fileErr, fileContents) => {
        if (!fileErr) {
            return resolve(fileContents);
        } else {
            return reject(fileErr);
        }
    });
});

const writeToFile = (filePath, reportObject) => new Promise((resolve, reject) => {
    const builder = new Builder();
    const xml = builder.buildObject(reportObject);
    fs.writeFile(filePath, xml, (err) => {
        if (err) {
            return reject(err);
        } else {
            return resolve();
        }
    });
});

const parseXml = (xml) => new Promise((resolve, reject) => {
    const parser = new Parser();
    parser.
    parser.parseString(xml, (err, result) => {
        if (err) {
            return reject(err);
        } else {
            return resolve(result);
        }
    });
});

const convertCoberturaFromThreeToFour = (coberturaThreeReport) => {

};

const transform = (inputFilePath, outputFilePath) => new Promise(async (resolve, reject) => {
    try {
        const inputFileContents = await loadFileContents(inputFilePath);
        const inputCoberturaReport = await parseXml(inputFileContents);
        const coberturaFourReport = convertCoberturaFromThreeToFour(inputCoberturaReport);
        await writeToFile(outputFilePath, coberturaFourReport);
        resolve();
    } catch (err) {
        return reject(err);
    }
});

module.exports = {
    transform
};
