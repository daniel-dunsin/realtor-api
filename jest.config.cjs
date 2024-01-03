/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.spec.ts", "**/**/*.test.ts"],
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
  verbose: true,
};
