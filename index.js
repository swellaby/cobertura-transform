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
    parser.parseString(xml, (err, result) => {
        if (err) {
            return reject(err);
        } else {
            return resolve(result);
        }
    });
});

const convertCoberturaFromThreeToFour = (coberturaReport) => {
    if (!coberturaReport || !coberturaReport.coverage || !Array.isArray(coberturaReport.coverage.packages)) {
        throw new Error('Invalid Cobertura XML. XML must comply with http://cobertura.sourceforge.net/xml/coverage-03.dtd');
    }
    let coveredLines = 0;
    let totalLines = 0;

    coberturaReport.coverage.packages.forEach(packageNode => {
        packageNode.package.forEach(packageArrayNode => {
            packageArrayNode.classes.forEach(classesArrayNode => {
                classesArrayNode.class.forEach(classArrayNode => {
                    classArrayNode.lines.forEach(linesArrayNode => {
                        linesArrayNode.line.forEach(line => {
                            totalLines++;
                            if (line['$'].hits > 0) {
                                coveredLines++;
                            }
                        });
                    });
                });
            });
        });
    });

    coberturaReport.coverage['$']['lines-valid'] = totalLines;
    coberturaReport.coverage['$']['lines-covered'] = coveredLines;
};

const buildTransformFailureError = (err, inputFilePath) => {
    let errorMessage = `Failed to transform file: ${inputFilePath}.`;
    if (err && err.message) {
        errorMessage += ` Details: ${err.message}`;
    }

    return new Error(errorMessage);
};

/**
 * Transforms a Cobertura 3 Report to the Cobertura 4 Format.
 *
 * @param {string} inputFilePath - The file path to the existing Cobertura 3 report.
 * @param {string} outputFilePath - The file path to write the transformed Cobertura 4 report.
 */
const transformCoberturaThreeToFour = (inputFilePath, outputFilePath) => new Promise((resolve, reject) => {
    if (!inputFilePath || typeof inputFilePath !== 'string') {
        return reject(new Error('Invalid value specified for inputFilePath. inputFilePath must be a string'));
    }

    if (!outputFilePath || typeof outputFilePath !== 'string') {
        return reject(new Error('Invalid value specified for outputFilePath. outputFilePath must be a string'));
    }

    loadFileContents(inputFilePath).then(fileContents => {
        parseXml(fileContents).then(coberturaReport => {
            try {
                convertCoberturaFromThreeToFour(coberturaReport);
                writeToFile(outputFilePath, coberturaReport)
                    .then(() => resolve())
                    .catch((err) => reject(buildTransformFailureError(err, inputFilePath)));
            } catch (err) {
                return reject(buildTransformFailureError(err, inputFilePath));
            }
        }).catch(err => reject(buildTransformFailureError(err, inputFilePath)));
    }).catch(err => {
        return reject(buildTransformFailureError(err, inputFilePath));
    });
});

module.exports = {
    transformCoberturaThreeToFour
};
