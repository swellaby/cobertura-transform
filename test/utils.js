'use strict';

const validInputFilePath = '/usr/foo/cobertura3.xml';
const validOutputFilePath = '/usr/bar/cobertura4.xml';

const invalidInputFileErrorMessage = 'Invalid value specified for inputFilePath. inputFilePath must be a string';
const invalidOutputFileErrorMessage = 'Invalid value specified for outputFilePath. outputFilePath must be a string';

const transformFailureBaseErrorMessage = (filePath) => `Failed to transform file: ${filePath}.`;
const defaultTransformFailureBaseErrorMessage = transformFailureBaseErrorMessage(validInputFilePath);
const transformFailureFullErrorMessage = (details, filePath) => `${transformFailureBaseErrorMessage(filePath)} Details: ${details}`;
const defaultTransformFailureErrorMessageDetails = 'oh nose!';
const defaultTransformFailureFullErrorMessage = transformFailureFullErrorMessage(defaultTransformFailureErrorMessageDetails, validInputFilePath);

module.exports = {
    validInputFilePath,
    validOutputFilePath,
    invalidInputFileErrorMessage,
    invalidOutputFileErrorMessage,
    transformFailureBaseErrorMessage,
    defaultTransformFailureBaseErrorMessage,
    transformFailureFullErrorMessage,
    defaultTransformFailureErrorMessageDetails,
    defaultTransformFailureFullErrorMessage
};
