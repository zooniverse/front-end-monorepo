const config = {
  verbose: true,
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}

module.exports = config
