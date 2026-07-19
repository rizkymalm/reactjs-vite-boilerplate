import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { defineConfig, globalIgnores } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

import eslintPluginImport from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import tailwindcss from 'eslint-plugin-tailwindcss';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import eslintPluginReact from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';

const fileName = fileURLToPath(import.meta.url);
const dirName = path.dirname(fileName);
const compat = new FlatCompat({
    baseDirectory: dirName,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default defineConfig([
    globalIgnores(['dist']),
    {
        name: 'Rules for TypeScript files',
        files: ['**/*.ts', '**/*.tsx', '**/*.mts', '**/*.mjs'],
        extends: [
            js.configs.recommended,
            tseslint.configs.recommended,
            reactHooks.configs.flat.recommended,
            reactRefresh.configs.vite,
        ],
        languageOptions: {
            globals: globals.browser,
        },
        plugins: {
            react: eslintPluginReact,
            'jsx-a11y': jsxA11y,
            'unused-imports': unusedImports,
            tailwindcss,
            'simple-import-sort': simpleImportSort,
            import: eslintPluginImport,
            '@typescript-eslint': tseslint.plugin,
        },
        rules: {
            'import/extensions': 'off',
            'react/function-component-definition': 'off',
            'react/destructuring-assignment': 'off',
            'react/require-default-props': 'off',
            'react/jsx-props-no-spreading': 'off',
            '@typescript-eslint/comma-dangle': 'off',
            '@typescript-eslint/consistent-type-imports': [
                'error',
                { prefer: 'type-imports' },
            ],
            'no-restricted-syntax': [
                'error',
                'ForInStatement',
                'LabeledStatement',
                'WithStatement',
            ],
            'import/prefer-default-export': 'off',
            'simple-import-sort/imports': 'error',
            'simple-import-sort/exports': 'error',
            'import/order': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            'unused-imports/no-unused-imports': 'error',
            '@typescript-eslint/lines-between-class-members': 0,
            '@typescript-eslint/no-throw-literal': 0,

            'unused-imports/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                },
            ],

            '@typescript-eslint/default-param-last': 'off',
            'no-param-reassign': 'off',
            'no-underscore-dangle': 'off',
            'no-nested-ternary': 'off',
            'import/no-unresolved': 'off',
            'import/no-extraneous-dependencies': [
                'error',
                {
                    devDependencies: true, // Allow devDependencies in files like tests, build scripts
                    optionalDependencies: false,
                    peerDependencies: false,
                    bundledDependencies: false,
                },
            ],

            'react/button-has-type': 'error',

            'no-plusplus': 'off',
            'react/react-in-jsx-scope': 'off',
            'jsx-a11y/no-noninteractive-element-interactions': 0,
            'jsx-a11y/click-events-have-key-events': 'off',
            'tailwindcss/no-custom-classname': 'off',
        },
    },
    {
        name: 'Prettier and Airbnb base rules for JS files',
        extends: compat.extends('airbnb-base', 'plugin:prettier/recommended'),

        languageOptions: {
            parserOptions: {
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },

        rules: {
            'prettier/prettier': [
                'error',
                {
                    semi: true,
                    trailingComma: 'es5',
                    singleQuote: true,
                    printWidth: 80,
                    tabWidth: 4,
                    useTabs: false,
                    endOfLine: 'auto',
                    bracketSpacing: true,
                    arrowParens: 'avoid',
                    plugins: ['prettier-plugin-tailwindcss'],
                },
            ],
        },
    },
]);
