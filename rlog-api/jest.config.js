module.exports = {
    displayName: 'zode',
    globals: {
      'ts-jest': {
        tsconfig: {
          noUnusedParameters: false,
          noUnusedLocals: false,
          incremental: true
        }
      }
    },
    moduleFileExtensions: ['ts', 'js', 'json'],
    resetMocks: true,
    resetModules: true,
    setupFilesAfterEnv: ['./jest.setup.js'],
    testEnvironment: 'node',
    testMatch: ['<rootDir>/src/**/*.test.ts'],
    testTimeout: 10000,
    transform: {
      '.*.tsx?$': 'ts-jest'
    },
    verbose: true
  }