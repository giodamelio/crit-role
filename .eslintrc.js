module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'jest'],
  extends: [
    'airbnb-typescript/base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:jest/all',
  ],
  rules: {
    // I like almost all of the ESLint Jest plugin's rules. Except these:
    'jest/no-hooks': 'off',
    'jest/no-expect-resolves': 'off',
    'jest/no-restricted-matchers': 'off',
    'jest/prefer-inline-snapshots': 'off',
  },
};
