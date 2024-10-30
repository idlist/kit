import globals from 'globals'
import js from '@eslint/js'
import ts from 'typescript-eslint'

const files = {
  js: [
    'eslint.config.js',
  ],
  ts: [
    'src/**/*.ts',
    'test/**/*.ts',
  ],
  tsScript: [
    '*.ts',
  ],
}

const allFiles = Object.values(files).flat()

export default ts.config(
  {
    files: files.tsScript,
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
    ],
  },
  {
    files: files.ts,
    extends: [
      js.configs.recommended,
      ...ts.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: [...files.ts, ...files.tsScript],
    rules: {
      'no-empty': 'off',
      '@typescript-eslint/no-empty': 'off',
      '@typescript-eslint/no-empty-interface': 'off',
      '@typescript-eslint/no-empty-object-type': 'off',

      '@typescript-eslint/no-empty-function': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
    },
  },
  {
    files: files.js,
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    ...js.configs.recommended,
    rules: {
      'no-empty': 'off',

      'no-empty-function': 'warn',
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'prefer-const': 'warn',
    },
  },
  {
    files: allFiles,
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      indent: ['warn', 2, { SwitchCase: 1 }],
      semi: ['warn', 'never'],
      quotes: ['warn', 'single'],
      'comma-dangle': ['warn', 'always-multiline'],
      'arrow-parens': ['warn', 'always'],
      'eol-last': ['warn', 'always'],
    },
  },
)
