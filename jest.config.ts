import type { Config } from 'jest'

const config: Config = {
  moduleNameMapper: {
    '^container/(.*)$': ['<rootDir>/src/container/$1'],
    '^modules/(.*)$': ['<rootDir>/src/modules/$1'],
    '^middlewares/(.*)$': ['<rootDir>/src/middlewares/$1'],
    '^utils/(.*)$': ['<rootDir>/src/utils/$1'],
    '^database/(.*)$': ['<rootDir>/src/database/$1'],
  },
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/useCases/**',
    '<rootDir>/src/modules/**/controllers/**',
  ],
}

export default config
