module.exports = {
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'max-len': 0,
    'import/prefer-default-export': 0,
  },
};
