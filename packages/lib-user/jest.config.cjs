const config = {
  verbose: true,
  testEnvironment: "jsdom",
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
