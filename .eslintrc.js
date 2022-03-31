module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/strongly-recommended',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 1, allowFirstLine: false },
    }],
  }
}
