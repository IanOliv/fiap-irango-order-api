
module.exports = {
  default: {
    paths: ['test/acceptance/features/**/*.feature'],
    requireModule: ['ts-node/register', 'tsconfig-paths/register', __dirname + "/register.js", __dirname + '/jestGlobal.js'],
    require: ['test/acceptance/step-definitions/**/*.ts', 'jest.config.integration.js'],
  },
};
