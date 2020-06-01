module.exports = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/tmp/', '<rootDir>/node_modules/'],
  collectCoverageFrom: ['src/**/*.ts']
};
