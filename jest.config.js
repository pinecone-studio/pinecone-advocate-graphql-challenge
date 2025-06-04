const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "node",
  rootDir: "./",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  testMatch: ["<rootDir>/specs/**/*.(test|spec).{js,jsx,ts,tsx}"],
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/*.{js,jsx,ts,tsx}",
    "**/graphql/resolvers/**/*.{js,jsx,ts,tsx}",
    "!**/components/ui/*.{js,jsx,ts,tsx}",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/out/**",
    "!**/*.d.ts",
    "!**/graphql/resolvers/index.ts",
  ],
  coverageDirectory: "<rootDir>/coverage",
  coverageReporters: ["text", "lcov", "json", "html"],
  coverageThreshold: {
    // global: {
    //   branches: 100,
    //   functions: 100,
    //   lines: 100,
    //   statements: 100,
    // },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", //!
  },
};

module.exports = createJestConfig(config);
