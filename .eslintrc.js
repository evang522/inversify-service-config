/** **************************************************************
 *  EXTENDS
 *  *************************************************************/

const _extends = [
    'eslint:recommended',
];

const _extendsTS = [
    ..._extends,
    'plugin:@typescript-eslint/recommended',
];

/** **************************************************************
 *  PLUGINS
 *  *************************************************************/
// Note: Plugins that are already used for extending don't need to get imported manually as plugins

const _plugins = [];

/** **************************************************************
 *  RULES
 *  *************************************************************/

const TemporaryOverridingRulesForJSAndTS = {
    // **********************************************************************
    // TODO: The rule "no-use-before-define" is currently broken for JS files. Use typescript rule also for JS files.
    //  Check: https://stackoverflow.com/questions/63818415/react-was-used-before-it-was-defined/
    //  And: https://github.com/typescript-eslint/typescript-eslint/issues/2502#issuecomment-689595020
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
};

const mainRules = {
    // **********************************************************************
    // Main rules for all files - incl. JS, TS, TSX.
    // Rules that conflict with *.d.ts and *.ts(x) files disabled/extended in the "overrides" blocks below.
    'no-var': 2,
    'prefer-const': 2,
    'no-shadow': 2,
    'no-shadow-restricted-names': 2,
    'no-undef': 2,
    'no-unused-vars': [
        2,
        {
            'vars': 'local',
            'args': 'after-used',
        },
    ],
    'no-cond-assign': [
        2,
        'always',
    ],
    'no-console': 2,
    'no-debugger': 1,
    'no-alert': 1,
    'no-constant-condition': 1,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty': 2,
    'no-ex-assign': 2,
    'no-extra-boolean-cast': 0,
    'no-extra-semi': 2,
    'no-func-assign': 2,
    'no-inner-declarations': 2,
    'no-invalid-regexp': 2,
    'no-irregular-whitespace': 2,
    'no-obj-calls': 2,
    'no-sparse-arrays': 2,
    'no-unreachable': 2,
    'use-isnan': 2,
    'block-scoped-var': 2,
    'consistent-return': 2,
    'curly': [
        2,
        'all',
    ],
    'default-case': 2,
    'eqeqeq': 2,
    'guard-for-in': 2,
    'no-caller': 2,
    'no-else-return': 2,
    'no-eq-null': 2,
    'no-eval': 2,
    'no-extend-native': 2,
    'no-extra-bind': 2,
    'no-fallthrough': 2,
    'no-floating-decimal': 2,
    'no-implied-eval': 2,
    'no-lone-blocks': 2,
    'no-loop-func': 2,
    'no-multi-str': 2,
    'no-native-reassign': 2,
    'no-new': 2,
    'no-new-func': 2,
    'no-new-wrappers': 2,
    'no-octal': 2,
    'no-octal-escape': 2,
    'no-param-reassign': 2,
    'no-proto': 2,
    'no-redeclare': 2,
    'no-return-assign': 2,
    'no-script-url': 2,
    'no-self-compare': 2,
    'no-sequences': 2,
    'no-throw-literal': 2,
    'no-with': 2,
    'radix': 2,
    'vars-on-top': 2,
    'yoda': 2,
    'multiline-ternary': [
        1,
        'never',
    ],
    'comma-dangle': [
        1,
        {
            'arrays': 'always-multiline',
            'objects': 'always-multiline',
            'imports': 'always-multiline',
            'exports': 'always-multiline',
            'functions': 'ignore',
        },
    ],
    'indent': [
        2,
        4,
        {
            'SwitchCase': 1,
        },
    ],
    'brace-style': 0,
    'quotes': [
        2,
        'single',
        'avoid-escape',
    ],
    'camelcase': [
        1,
        {
            'properties': 'never',
        },
    ],
    'comma-spacing': [
        2,
        {
            'before': false,
            'after': true,
        },
    ],
    'comma-style': [
        2,
        'last',
    ],
    'eol-last': 2,
    'func-names': 1,
    'key-spacing': [
        2,
        {
            'beforeColon': false,
            'afterColon': true,
        },
    ],
    'new-cap': [
        0,
        {
            'newIsCap': true,
        },
    ],
    'no-multiple-empty-lines': [
        2,
        {
            'max': 1,
            'maxBOF': 1,
            'maxEOF': 1,
        },
    ],
    'no-multi-spaces': 1,
    'no-nested-ternary': 2,
    'no-new-object': 2,
    'no-spaced-func': 2,
    'no-trailing-spaces': 2,
    'no-extra-parens': [
        2,
        'functions',
    ],
    'no-underscore-dangle': 0,
    'one-var': [
        2,
        'never',
    ],
    'padded-blocks': [
        2,
        'never',
    ],
    'semi-spacing': [
        2,
        {
            'before': false,
            'after': true,
        },
    ],
    'space-before-blocks': [
        2,
        'always',
    ],
    'arrow-spacing': [
        2,
        {
            'before': true,
            'after': true,
        },
    ],
    'space-before-function-paren': [
        2,
        'never',
    ],
    'space-infix-ops': 2,
    'spaced-comment': [
        2,
        'always',
        {
            'exceptions': [
                '-',
                '+',
            ],
            'markers': [
                '=',
                '!',
            ],
        },
    ],
    'jsx-quotes': [
        2,
        'prefer-double',
    ],
    'object-curly-newline': [
        2, {
            'ObjectExpression': {
                'multiline': false,
                'minProperties': 1,
            },
            'ObjectPattern': {
                'multiline': false,
                'minProperties': 2,
            },
            'ImportDeclaration': {
                'multiline': false,
                'minProperties': 2,
            },
            'ExportDeclaration': {
                'multiline': false,
                'minProperties': 2,
            },
        },
    ],
    'object-curly-spacing': [
        2,
        'always',
    ],
    'object-property-newline': [
        2, {
            'allowAllPropertiesOnSameLine': false,
        },
    ],
    'array-bracket-newline': [
        2, {
            'multiline': true,
            'minItems': 2,
        },
    ],
    'array-bracket-spacing': [
        2,
        'always',
    ],
    'array-element-newline': [
        2, 'consistent',
    ],
    'padding-line-between-statements': [
        2,
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'return',
        },
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'if',
        },
        {
            'blankLine': 'always',
            'prev': 'if',
            'next': '*',
        },
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'try',
        },
        {
            'blankLine': 'always',
            'prev': 'try',
            'next': '*',
        },
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'block',
        },
        {
            'blankLine': 'always',
            'prev': 'block',
            'next': '*',
        },
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'block-like',
        },
        {
            'blankLine': 'always',
            'prev': 'block-like',
            'next': '*',
        },
        {
            'blankLine': 'any',
            'prev': 'expression',
            'next': 'expression',
        },
        {
            'blankLine': 'always',
            'prev': '*',
            'next': 'multiline-expression',
        },
        {
            'blankLine': 'always',
            'prev': 'multiline-expression',
            'next': '*',
        },
    ],
    'no-whitespace-before-property': 2,
    'no-confusing-arrow': 1,
    'keyword-spacing': [
        2,
        {
            'before': true,
            'after': true,
        },
    ],
    'lines-between-class-members': [
        2,
        'always',
        {
            exceptAfterSingleLine: true,
        },
    ],
    'function-call-argument-newline': [
        2, 'consistent',
    ],
    'block-spacing': [
        2,
        'never',
    ],
    'no-lonely-if': 2,
    'linebreak-style': [
        2,
        'unix',
    ],
    'rest-spread-spacing': [
        2,
        'never',
    ],
    'max-len': [
        1,
        {
            'comments': 140,
            'code': 120,
            'ignorePattern': 'import ',
        },
    ],
};

const RulesForTS = {
    '@typescript-eslint/brace-style': [
        2,
        'allman',
        {
            'allowSingleLine': true,
        },
    ],
    '@typescript-eslint/camelcase': 0,
    '@typescript-eslint/ban-ts-comment': [
        1,
        {
            'ts-expect-error': false,
            'ts-ignore': true,
            'ts-nocheck': false,
            'ts-check': false,
        },
    ],
    '@typescript-eslint/ban-types': 1,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/interface-name-prefix': 0,
    '@typescript-eslint/member-delimiter-style': [
        2,
        {
            'multiline': {
                'delimiter': 'semi',
                'requireLast': true,
            },
            'singleline': {
                'delimiter': 'semi',
                'requireLast': false,
            },
        },
    ],
    '@typescript-eslint/no-empty-interface': 0,
    '@typescript-eslint/no-inferrable-types': 0,
    '@typescript-eslint/explicit-function-return-type': 2,
    // **********************************************************************
    // Rules that have conflicts generally
    'no-undef': 0,
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 2,
    'no-use-before-define': 0,
    '@typescript-eslint/no-use-before-define': 2,
    'semi': 0,
    '@typescript-eslint/semi': 2,
};


/** **************************************************************
 *  ESLINT MODULE EXPORT
 *  *************************************************************/

module.exports = {
    parser: '@typescript-eslint/parser',
    extends: process.env.REACT_APP_CUSTOM_ESLINT_FOR_REACT_SCRIPTS_START ? _extendsForCRA : _extends,
    plugins: _plugins,
    env: {
        'browser': true,
        'node': true,
        'mocha': true,
        'es6': true,
        'jest': true,
    },
    globals: {
        'expect': true,
        'sinon': true,
        '__DEV__': true,
    },
    settings: {
        'react': {
            'pragma': 'React',
            'version': 'detect',
        },
    },
    rules: mainRules,
    overrides: [
        {
            files: [ './src/**/*.ts*' ],
            extends: _extendsTS,
            rules: {
                ...mainRules,
                ...RulesForTS,
            },
        },
        {
            files: [ './src/**/*.d.ts*' ],
            rules: {
                // Disable '@typescript-eslint/no-unused-vars' rule because it currently conflicts generally
                '@typescript-eslint/no-unused-vars': 0,
            },
        },
        {
            files: [ './src/**/*.test.ts*' ],
            rules: {
                // Rule '@typescript-eslint/ban-ts-comment' only set to warn because sometimes it's needed to use it
                '@typescript-eslint/ban-ts-comment': [
                    1,
                    {
                        'ts-expect-error': false,
                        'ts-ignore': false,
                        'ts-nocheck': false,
                        'ts-check': false,
                    },
                ],
            },
        },
    ],
};
