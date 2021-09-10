module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'warn',
    indent: ['warn', 2],
    'jsx-a11y/label-has-associated-control': 0,
    'linebreak-style': 'off',
    'max-len': ['warn', 150],
    'new-cap': ['error', { newIsCapExceptions: ['moment'] }],
    'no-param-reassign': 'off',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    radix: ['error', 'as-needed'],
    'no-unused-vars': ['warn', { args: 'none' }],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-indent': ['warn', 2],
    'react/jsx-props-no-spreading': [2, { html: 'ignore' }],
    'react/jsx-uses-react': 'off',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'require-jsdoc': ['off', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
      },
    },
    ],
    'valid-jsdoc': ['error',
      {
        requireReturn: true,
        requireReturnType: true,
        requireParamDescription: true,
        requireReturnDescription: true,
      },
    ],
  },
};
