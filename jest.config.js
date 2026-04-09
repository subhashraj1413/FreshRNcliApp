module.exports = {
  preset: '@react-native/jest-preset',
  moduleNameMapper: {
    '\\.(ttf)$': '<rootDir>/__mocks__/file-mock.js',
    '^@react-native-vector-icons/common$':
      '<rootDir>/__mocks__/@react-native-vector-icons/common.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-navigation)/)',
  ],
};
