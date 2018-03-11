module.exports = {
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    testRegex: "\\.spec\\.tsx?$",
    moduleFileExtensions: [ "ts", "tsx", "js" ],
    collectCoverage: true,
    // collectCoverageFrom: [
    //     "**/front/**/*.{ts,tsx}",
    // ],
    coverageDirectory: "./front/coverage",
    moduleDirectories: ["node_modules", "front"],
}
