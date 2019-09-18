module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  settings: {
    react: {
      version: 'latest',
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018, //指定ECMAScript支持的版本
    sourceType: 'module', //指定来源的类型，有两种”script”或”module”
    ecmaFeatures: {
      jsx: true, //启动JSX
    },
  },
  env: {
    es6: true,
    browser: true,
  },
  globals: {
    antd: true,
    T: true,
    moment: true,
    PropTypes: true,
    CONFIG: true,
    ReactDOM: true,
    React: true,
  },
  rules: {
    // 'no-unused-vars': 0,
    'no-console': 0,
    'react/jsx-no-undef': 0,
    'no-script-url': 0,
    'jsx-a11y/heading-has-content': [0, 'Header'],
    'jsx-a11y/anchor-has-content': [0],
  },
  // plugins: ['react'],
};
