import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

const eslintConfig = [
  ...compat.extends(
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:tailwindcss/recommended'
  ),
  ...compat.plugins(
    'react',
    'react-hooks',
    '@typescript-eslint',
    'prettier',
    'tailwindcss'
  ),

  ...compat.config({
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier',
      'plugin:react/recommended',
      'plugin:react/jsx-runtime',
      'plugin:tailwindcss/recommended'
    ],
    plugins: [
      'react',
      'react-hooks',
      '@typescript-eslint',
      'prettier',
      'tailwindcss'
    ],
    rules: {
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-no-undef': 'error',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn'
    },

    ignorePatterns: [
      'node_modules/',
      '.next/',
      'out/',
      'public/static/',
      '.vercel/',
      '*.log',
      'logs/',
      '*.log*',
      'npm-debug.log*',
      'yarn-debug.log*',
      'yarn-error.log*',
      '.vscode/',
      '.idea/',
      '*.suo',
      '*.ntvs*',
      '*.njsproj',
      '*.sln',
      'README.md',
      'create-module.ts',
      'globals.css',
      '.env',
      '.env.local',
      '.env.development.local',
      '.env.test.local',
      '.env.production.local'
    ],

    settings: {
      react: {
        version: 'detect'
      }
    }
  })
];

export default eslintConfig;
