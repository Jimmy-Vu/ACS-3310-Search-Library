module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts'],
  globals: {
    'ts-jest': {
      tsconfig: {
        moduleResolution: 'node',
        esModuleInterop: true,
        strict: true,
      },
    },
  },
}
