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
    'vue/valid-v-slot': ['error', {
      allowModifiers: true,
    }],
    'vue/require-default-prop': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: { max: 5 },
      multiline: { max: 1, allowFirstLine: false },
    }],
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/prop-name-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/this-in-template': ['error', 'never'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/order-in-components': 'error',
    'vue/html-closing-bracket-newline': ['error', {
      singleline: 'never',
      multiline: 'always',
    }],
    'vue/html-closing-bracket-spacing': ['error', {
      selfClosingTag: 'always',
    }],
    'vue/custom-event-name-casing': ['error', {
      ignores: [
        '/^[a-z]+(?:-[a-z]+)*:[a-z]+(?:-[a-z]+)*$/u',
      ],
    }],
    'import/extensions': ['error', 'always', {
      js: 'never',
      mjs: 'never',
      jsx: 'never',
      ts: 'never',
      tsx: 'never',
    }],
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e', // for e.returnvalue
      ],
    }],
  }
}
