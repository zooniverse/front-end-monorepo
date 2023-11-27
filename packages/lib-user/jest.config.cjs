const config = {
  testEnvironment: "jsdom",
  testMatch: [
    "<rootDir>/src/**/*.spec.js"
  ],
  transform: {
    "^.+\\.js$": "babel-jest"
  },
  verbose: true
}

module.exports = config
