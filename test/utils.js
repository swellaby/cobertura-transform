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
const invalidCoberturaXmlErrorMessageDetails = 'Invalid Cobertura XML. XML must comply with http://cobertura.sourceforge.net/xml/coverage-03.dtd';
const invalidCoberturaXmlFullErrorMessage = transformFailureFullErrorMessage(invalidCoberturaXmlErrorMessageDetails, validInputFilePath);

const sampleInputContents = '<xml></xml>';

const emptyPackagesCoberturaReport = {
    coverage: {
        $: {

        },
        packages: []
    }
};

const coberturaReport = {
    coverage: {
        $: {

        },
        packages: [
            {
                package: [
                    {
                        $: {
                            'line-rate': 0.109,
                            'branch-rate': 1.0,
                            complexity: 1.0
                        },
                        classes: [
                            {
                                class: [
                                    {
                                        $: {
                                            name: 'rusty_hook_rs',
                                            filename: 'rusty_hook.rs',
                                            'line-rate': 0.000
                                        },
                                        lines: [
                                            {
                                                line: [
                                                    {
                                                        $: {
                                                            number: 7,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 13,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 26,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 27,
                                                            hits: 0
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        $: {
                                            name: 'git_rs',
                                            filename: 'git.rs',
                                            'line-rate': 0.286
                                        },
                                        lines: [
                                            {
                                                line: [
                                                    {
                                                        $: {
                                                            number: 1,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 5,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 6,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 8,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 12,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 13,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 51,
                                                            hits: 0
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 60,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 61,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 62,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 63,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 64,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 65,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 66,
                                                            hits: 1
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 67,
                                                            hits: 0
                                                        }
                                                    },
                                                    {
                                                        $: {
                                                            number: 68,
                                                            hits: 1
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
};

const getReportCopy = () => JSON.parse(JSON.stringify(coberturaReport));

module.exports = {
    validInputFilePath,
    validOutputFilePath,
    invalidInputFileErrorMessage,
    invalidOutputFileErrorMessage,
    transformFailureBaseErrorMessage,
    defaultTransformFailureBaseErrorMessage,
    transformFailureFullErrorMessage,
    defaultTransformFailureErrorMessageDetails,
    defaultTransformFailureFullErrorMessage,
    sampleInputContents,
    invalidCoberturaXmlErrorMessageDetails,
    invalidCoberturaXmlFullErrorMessage,
    emptyPackagesCoberturaReport,
    coberturaReport,
    getReportCopy,
};
