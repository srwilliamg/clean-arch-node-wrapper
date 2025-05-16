import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    moduleFileExtensions: ['js', 'json', 'ts'],
    rootDir: '.',
    testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
    transform: {
      '^.+\\.(t|j)s$': 'ts-jest',
    },
    coverageDirectory: '../coverage',
    moduleNameMapper: {
      '@app/(.*)': '<rootDir>/src/$1',
    },
  };
};
