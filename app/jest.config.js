module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "\\.spec\\.tsx?$",
    moduleFileExtensions: [ "ts", "tsx", "js" ],
    collectCoverage: true,
    coverageDirectory: "./front/coverage"
}
