module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|my-project|react-native-button)', // Ajusta según sea necesario
  ],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
  },
};
