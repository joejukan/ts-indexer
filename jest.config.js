/** @type {import('@swc/core').Config} */
const swc = {
  jsc: {
    parser: {
      decorators: true,
      decoratorsBeforeExport: true,
      exportDefaultFrom: true,
      syntax: 'typescript'
    },
  }
}

/** @type {import('jest').Config} */
module.exports = {
  transform: {
    "^.+\\.(t|j)sx?$": ["@swc/jest", swc],
  },
  coverageDirectory: '.coverage',
};