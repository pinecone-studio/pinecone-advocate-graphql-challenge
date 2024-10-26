// import type { Config } from 'jest'
const nextJest = require("next/jest");
const defaults = require("jest-config");

// Create a custom Jest configuration using Next.js support
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
const config = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "node",
  rootDir: "./",
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  collectCoverage: true,
  collectCoverageFrom: [
    "!**/*.{js,jsx,ts,tsx}", // Exclude all JS and TS files from coverage
    "**/graphql/resolvers/**/*.{js,jsx,ts,tsx}", // Include resolvers for coverage
    "!**/components/ui/*.{js,jsx,ts,tsx}", // Exclude UI components from coverage
    "!**/node_modules/**", // Exclude node_modules
    "!**/.next/**", // Exclude Next.js build files
    "!**/out/**", // Exclude output directory
    "!**/*.d.ts", // Exclude type definitions
    "!**/graphql/resolvers/index.ts", // Exclude specific index file from coverage
  ],
  testMatch: ["<rootDir>/specs/**/*.(test|spec).{js,jsx,ts,tsx}"], // Match test files in specs directory
  coverageDirectory: "<rootDir>/coverage", // Directory for coverage reports
  coverageReporters: ["text", "lcov", "json", "html"], // Report formats for coverage
  coverageThreshold: {
    global: {
      branches: 100, // Require 100% branch coverage
      functions: 100, // Require 100% function coverage
      lines: 100, // Require 100% line coverage
      statements: 100, // Require 100% statement coverage
    },
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Map @ to the root directory for absolute imports
  },
};

module.exports = createJestConfig(config); // Export the configured Jest settings
