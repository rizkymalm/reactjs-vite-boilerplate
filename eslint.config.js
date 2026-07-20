import js from '@eslint/js';
import globals from 'globals';

import tseslint from 'typescript-eslint';

import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

import importPlugin from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

import { globalIgnores } from 'eslint/config';
import tailwindcss from 'eslint-plugin-tailwindcss';

export default [
    globalIgnores(['dist']),
    js.configs.recommended,
    ...tseslint.configs.recommended,
    react.configs.flat.recommended,
    reactHooks.configs.flat.recommended,
    jsxA11y.flatConfigs.recommended,
    reactRefresh.configs.vite,
    {
        name: 'Rules for TypeScript files',
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                projectService: true,
                ecmaVersion: 'latest',
                sourceType: 'module',
            },
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        plugins: {
            import: importPlugin,
            'unused-imports': unusedImports,
            'simple-import-sort': simpleImportSort,
            tailwindcss,
        },
        settings: {
            react: {
                version: 'detect',
            },
            tailwindcss: {
                callees: ['cn', 'clsx', 'cva'],
                cssConfigPath: './src/index.css',
            },
        },
        rules: {
            ...tailwindcss.configs.recommended.rules,
            //imports
            'import/order': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/extensions': 'off',
            'react/function-component-definition': 'off',
            //unused imports
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            'unused-imports/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            //react
            'react/react-in-jsx-scope': 'off',
            'react/button-has-type': 'error',
            'react/prop-types': 'off',
            //typescript
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],
            //general
            'no-console': [
                'warn',
                {
                    allow: ['warn', 'error', 'info'],
                },
            ],
            //tailwindcss
            'tailwindcss/no-custom-classname': 'off',
            //accessibility
            'jsx-a11y/click-events-have-key-events': 'warn',

            'react-refresh/only-export-components': 'warn',

            'react/destructuring-assignment': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'import/prefer-default-export': 'off',
            'default-param-last': 'off',
            'no-param-reassign': 'off',
            'no-underscore-dangle': 'off',
            'no-nested-ternary': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true, // Allow devDependencies in files like tests, build scripts
                    optionalDependencies: false,
                    peerDependencies: false,
                    bundledDependencies: false,
                },
            ],
            'no-plusplus': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 0,
        },
    },
];
