module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "app.js",
    "src/**/*.js",
    "!src/**/*.test.js",
    "!src/**/index.js",
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["html", "text", "lcov"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
