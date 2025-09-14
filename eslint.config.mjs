import shopifyPlugin from '@shopify/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'
import jestDomPlugin from 'eslint-plugin-jest-dom'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'
import reactPlugin from 'eslint-plugin-react'
import reactCompilerPlugin from 'eslint-plugin-react-compiler'
import reactHooksPlugin from 'eslint-plugin-react-hooks'
import regexPlugin from 'eslint-plugin-regex'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

import { restrictedGlobals } from './eslint/restrictedGlobals.mjs'

export default [
	{
		ignores: ['.next/', '**/*.js', '**/*.mjs', '**/*.cjs', '**/*.module.d.css.ts'], // "ignores" must be in a separate configuration object
	},
	{
		plugins: {
			'@typescript-eslint': typescriptPlugin,
			'unused-imports': unusedImportsPlugin,
			react: reactPlugin,
			'react-hooks': reactHooksPlugin,
			'react-compiler': reactCompilerPlugin,
			'jsx-a11y': jsxA11yPlugin,
			'@shopify-eslint-plugin': shopifyPlugin,
			regex: regexPlugin,
		},
		files: ['**/*.ts', '**/*.tsx'],
		linterOptions: { reportUnusedDisableDirectives: 'error' },
		languageOptions: {
			parser, // needed for *.ts and *.tsx files
			parserOptions: {
				project: true, // needed for @typescript-eslint plugin
			},
		},
		settings: {
			// used by react/jsx-no-target-blank and react/jsx-no-scripts-url
			linkComponents: [
				{ name: 'Link', linkAttribute: 'href' },
				{ name: 'AppLink', linkAttribute: 'href' },
			],
			react: {
				version: 'detect', // suppresses command line error
			},
		},
		rules: {
			// eslint possible problems
			'array-callback-return': ['error', { checkForEach: true, allowVoid: true }],
			'constructor-super': 'off', // unnecessary because of typescript
			'for-direction': 'error',
			'getter-return': 'error',
			'no-async-promise-executor': 'error',
			'no-await-in-loop': 'error',
			'no-class-assign': 'error',
			'no-compare-neg-zero': 'error',
			'no-cond-assign': 'error',
			'no-const-assign': 'off', // unnecessary because of typescript
			'no-constant-binary-expression': 'error',
			'no-constant-condition': 'error',
			'no-constructor-return': 'error',
			'no-control-regex': 'error',
			'no-debugger': 'error',
			'no-dupe-args': 'off', // unnecessary because of typescript
			'no-dupe-class-members': 'off', // unnecessary because of typescript
			'no-dupe-else-if': 'error',
			'no-dupe-keys': 'off', // unnecessary because of typescript
			'no-duplicate-case': 'error',
			'no-duplicate-imports': 'off', // superseded by @ianvs/prettier-plugin-sort-imports
			'no-empty-character-class': 'error',
			'no-empty-pattern': 'error',
			'no-ex-assign': 'error',
			'no-fallthrough': 'off', // unnecessary because of typescript
			'no-func-assign': 'off', // unnecessary because of typescript
			'no-import-assign': 'off', // unnecessary because of typescript
			'no-inner-declarations': 'error',
			'no-invalid-regexp': 'error',
			'no-irregular-whitespace': 'error',
			'no-loss-of-precision': 'error',
			'no-misleading-character-class': 'error',
			'no-new-native-nonconstructor': 'error',
			'no-obj-calls': 'off', // unnecessary because of typescript
			'no-promise-executor-return': ['error', { allowVoid: true }],
			'no-prototype-builtins': 'error',
			'no-self-assign': 'error',
			'no-self-compare': 'error',
			'no-setter-return': 'off', // unnecessary because of typescript
			'no-sparse-arrays': 'error',
			'no-template-curly-in-string': 'error',
			'no-this-before-super': 'off', // unnecessary because of typescript
			'no-undef': 'off', // unnecessary because of typescript
			'no-unexpected-multiline': 'off', // unnecessary because of prettier
			'no-unmodified-loop-condition': 'error',
			'no-unreachable': 'off', // unnecessary because of typescript
			'no-unreachable-loop': 'error',
			'no-unsafe-finally': 'error',
			'no-unsafe-negation': 'off', // unnecessary because of typescript
			'no-unsafe-optional-chaining': ['error', { disallowArithmeticOperators: true }],
			'no-unused-private-class-members': 'error',
			'no-unused-vars': 'off', // superseded by unused-imports/no-unused-vars - must disable the base rule as it can report incorrect errors
			'no-use-before-define': 'error',
			'no-useless-assignment': 'off', // available in eslint v9
			'no-useless-backreference': 'error',
			'require-atomic-updates': 'error',
			'use-isnan': ['error', { enforceForIndexOf: true }],
			'valid-typeof': 'error',
			// eslint suggestions
			'accessor-pairs': 'error',
			'arrow-body-style': 'off', // turned off because it's a stylistic preference
			'block-scoped-var': 'error',
			camelcase: 'off', // too rigid
			'capitalized-comments': 'off', // turned off because it's a stylistic preference
			'class-methods-use-this': 'off', // superseded by @typescript-eslint/class-methods-use-this
			complexity: 'off', // too rigid
			'consistent-return': 'off', // superseded by @typescript-eslint/consistent-return
			'consistent-this': 'error',
			curly: 'error',
			'default-case': 'error',
			'default-case-last': 'error',
			'default-param-last': 'off', // superseded by @typescript-eslint/default-param-last
			'dot-notation': 'off', // superseded by @typescript-eslint/dot-notation
			eqeqeq: 'error', // typescript behaves as "smart" option, so setting this rule enforces consistency rather than protect against code errors
			'func-name-matching': ['error', { considerPropertyDescriptor: true, includeCommonJSModuleExports: true }],
			'func-names': 'error',
			'func-style': 'off', // too rigid, doesn't support TypeScript function overrides and https://github.com/eslint/eslint/issues/5183
			'grouped-accessor-pairs': 'error',
			'guard-for-in': 'error',
			'id-denylist': ['error', 'err', 'e', 'cb', 'i', 'idx'],
			'id-length': 'off', // too rigid
			'id-match': 'off', // too rigid
			'init-declarations': 'off', // too rigid
			'logical-assignment-operators': ['error', 'always', { enforceForIfStatements: true }],
			'max-classes-per-file': 'off', // too rigid
			'max-depth': 'off', // too rigid
			'max-lines': 'off', // too rigid
			'max-lines-per-function': 'off', // too rigid
			'max-nested-callbacks': 'off', // too rigid
			'max-params': ['error', { max: 4 }],
			'max-statements': 'off', // too rigid
			'new-cap': 'error',
			'no-alert': 'error', // alert, confirm, and prompt are planned for deprecation https://github.com/whatwg/html/issues/2894
			'no-array-constructor': 'error',
			'no-bitwise': 'error',
			'no-caller': 'error',
			'no-case-declarations': 'error',
			'no-console': 'error',
			'no-continue': 'error',
			'no-delete-var': 'error',
			'no-div-regex': 'error',
			'no-else-return': 'off',
			'no-empty': 'error',
			'no-empty-function': 'error',
			'no-empty-static-block': 'error',
			'no-eq-null': 'off', // unnecessary because of typescript
			'no-eval': 'error',
			'no-extend-native': 'error',
			'no-extra-bind': 'error',
			'no-extra-boolean-cast': 'error',
			'no-extra-label': 'error',
			'no-global-assign': 'off', // unnecessary because of typescript
			'no-implicit-coercion': [
				'error',
				{
					boolean: true, // `Boolean(someValue)` doesn't properly narrow on nullable values, use custom `!isNullish(someValue)` instead: https://www.totaltypescript.com/workshops/typescript-pro-essentials/unions-and-narrowing/narrowing-with-boolean-wont-work
					number: false,
				},
			],
			'no-implicit-globals': 'error',
			'no-implied-eval': 'error',
			'no-inline-comments': 'off', // too rigid
			'no-invalid-this': 'off', // unnecessary because of typescript
			'no-iterator': 'error',
			'no-label-var': 'error',
			'no-labels': 'error',
			'no-lone-blocks': 'error',
			'no-lonely-if': 'error',
			'no-loop-func': 'error',
			'no-magic-numbers': ['error', { ignore: [-1, 0, 1], enforceConst: true }],
			'no-multi-assign': 'error',
			'no-multi-str': 'error',
			'no-negated-condition': 'error',
			'no-nested-ternary': 'error',
			'no-new': 'error',
			'no-new-func': 'error',
			'no-new-wrappers': 'error',
			'no-nonoctal-decimal-escape': 'error',
			'no-object-constructor': 'error',
			'no-octal': 'error',
			'no-octal-escape': 'error',
			'no-param-reassign': ['error', { props: true }],
			'no-plusplus': 'off',
			'no-proto': 'error',
			'no-redeclare': 'off', // unnecessary because of typescript
			'no-regex-spaces': 'error',
			'no-restricted-exports': [
				'error',
				{
					restrictDefaultExports: {
						direct: true,
						named: true,
						defaultFrom: true,
						namedFrom: true,
						namespaceFrom: true,
					},
				},
			], // https://medium.com/@stayyabmazhar19991/why-default-exports-are-bad-in-javascript-a-comprehensive-guide-7c77abc7061d
			'no-restricted-globals': [
				'error',
				...restrictedGlobals,
				{ name: 'process', message: 'To ensure environment variables are type-safe import `processEnv` instead' },
			],
			'no-restricted-imports': [
				'error',
				// TODO: https://theodorusclarence.com/shorts/vscode/auto-import-sort and then enable source.addMissingImports??
				// next.js
				{ name: 'next/link', message: 'Import from "src/components/AppLink/AppLink.tsx" instead' },
				{
					name: 'next/router',
					message: '"next/router" is for Next.js Pages Router. Import from "next/navigation" instead',
				},
				// dayjs
				{ name: 'dayjs', message: "To ensure correct dayjs behavior import from 'src/utils/dutchjs.ts' instead" },
				// mui
				/// Button
				{ name: '@mui/material', importNames: ['Button'], message: 'Import from src/aero/Button.tsx instead' },
				{ name: '@mui/material/Button', message: 'Import from src/aero/Button.tsx instead' },
				/// Typography
				{
					name: '@mui/material',
					importNames: ['Typography'],
					message: 'Import from src/aero/Typography.tsx instead',
				},
				{ name: '@mui/material/Typography', message: 'Import from src/aero/Typography.tsx instead' },
				/// Card
				{ name: '@mui/material', importNames: ['Card'], message: 'Import from src/aero/Card.tsx instead' },
				{ name: '@mui/material/Card', message: 'Import from src/aero/Card.tsx instead' },
				/// CardHeader
				{
					name: '@mui/material',
					importNames: ['CardHeader'],
					message: 'Import from src/aero/CardHeader.tsx instead',
				},
				{ name: '@mui/material/CardHeader', message: 'Import from src/aero/CardHeader.tsx instead' },
				/// CardContent
				{
					name: '@mui/material',
					importNames: ['CardContent'],
					message: 'Import from src/aero/CardContent.tsx instead',
				},
				{ name: '@mui/material/CardContent', message: 'Import from src/aero/CardContent.tsx instead' },
				/// Link
				{ name: '@mui/material/Link', message: 'Import from "src/components/AppLink/AppLink.tsx" instead' },
				{
					name: '@mui/material',
					importNames: ['Link'],
					message: 'Import from "src/components/AppLink/AppLink.tsx" instead',
				},
				/// icons
				{ name: '@mui/icons-material', message: "Use `import WhateverIcon from '@mui/icons-material/Whatever'`" },
			],
			'no-restricted-properties': 'off',
			'no-restricted-syntax': [
				'error',
				// javascript
				{ selector: "CallExpression[callee.property.name='reverse']", message: 'Use .toReversed() instead' },
				{ selector: "CallExpression[callee.property.name='sort']", message: 'Use .toSorted() instead' },
				// react
				{
					selector: "CallExpression[callee.name='useMemo']", // matches `useMemo()`
					message: 'useMemo is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.property.name='useMemo']", // matches `React.useMemo()`
					message: 'React.useMemo is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.name='useCallback']", // matches `useCallback()`
					message: 'useCallback is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.property.name='useCallback']", // matches `React.useCallback()`
					message: 'React.useCallback is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.name='memo']", // matches `memo()`
					message: 'memo is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.property.name='memo']", // matches `React.memo()`
					message: 'React.memo is an unnecessary performance optimization starting with react 19',
				},
				{
					selector: "CallExpression[callee.name='useContext']", // matches `useContext()`
					message: 'useContext has been replaced by use(MyCustomContext) starting with react 19',
				},
				{
					selector: "CallExpression[callee.property.name='useContext']", // matches `React.useContext()`
					message: 'React.useContext has been replaced by React.use(MyCustomContext) starting with react 19',
				},
				{
					selector: "CallExpression[callee.name='forwardRef']", // matches `forwardRef()`
					message: 'forwardRef is unnecessary starting with react 19 because ref is just a regular prop',
				},
				{
					selector: "CallExpression[callee.property.name='forwardRef']", // matches `React.forwardRef()`
					message: 'React.forwardRef is unnecessary starting with react 19 because ref is just a regular prop',
				},
				{
					selector: "[openingElement.name.property.name='Provider']",
					message:
						'Starting with react 19 <MyCustomContext.Provider value={...}> has been replaced with <MyCustomContext value={...}>.',
				},
				// kysely
				{
					selector: "CallExpression[callee.property.name='executeTakeFirstOrThrow']",
					message:
						'.executeTakeFirstOrThrow() is banned because it obscures the possibility that the function may throw. Use .executeTakeFirst() instead and explicitly handle missing row.',
				},
				// zod
				{
					selector: "CallExpression[callee.property.name='date'][arguments.length=0]", // TODO: [arguments.length=0] is a workaround to be able to differentiate `z.date()` and `dutch().date(someValue)`
					message:
						'z.date() is banned because it generates banned native JavaScript Date instances. Use `dutchTimestampSchema` instead.',
				},
				// dayjs
				{ selector: "CallExpression[callee.name='dayjs']", message: 'Use `dutchjs()` instead.' },
				{
					selector: "CallExpression[callee.object.name='dayjs'][callee.property.name='tz']",
					message: 'dayjs.tz() is banned in favor of dayjs().tz(). See README.md for details.',
				},
				{
					selector: "CallExpression[callee.property.name='toISOString']",
					message: 'dayjs.Dayjs.toISOString() is banned in favor of dayjs.Dayjs.format().',
				},
				{
					selector: "CallExpression[callee.property.name='toJSON']", // https://stackoverflow.com/a/16198620
					message: 'dayjs.Dayjs.toJSON() is banned in favor of dayjs.Dayjs.format().',
				},
				// miscellaneous
				{
					selector: "CallExpression[callee.object.name='Object'][callee.property.name='fromEntries']",
					message: 'Use objectFromEntries from src/utils/objectFromEntries.ts instead.',
				},
				{
					selector: "CallExpression[callee.object.name='Object'][callee.property.name='entries']",
					message: 'Use objectEntries from src/utils/objectEntries.ts instead.',
				},
				{
					selector: "CallExpression[callee.object.name='Object'][callee.property.name='keys']",
					message: 'Use objectKeys from src/utils/objectKeys.ts instead.',
				},
			],
			'no-return-assign': ['error', 'always'],
			'no-script-url': 'error',
			'no-sequences': 'error',
			'no-shadow': 'off', // superseded by @typescript-eslint/no-shadow - must disable the base rule as it can report incorrect errors
			'no-shadow-restricted-names': 'error',
			'no-ternary': 'off',
			'no-throw-literal': 'error',
			'no-undef-init': 'error',
			'no-undefined': 'error',
			'no-underscore-dangle': 'off',
			'no-unneeded-ternary': ['error', { defaultAssignment: false }],
			'no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, enforceForJSX: true }],
			'no-unused-labels': 'error',
			'no-useless-call': 'error',
			'no-useless-catch': 'error',
			'no-useless-computed-key': 'error',
			'no-useless-concat': 'error',
			'no-useless-constructor': 'error',
			'no-useless-escape': 'error',
			'no-useless-rename': 'error',
			'no-useless-return': 'error',
			'no-var': 'error',
			'no-void': 'off',
			'no-warning-comments': 'off', // superseded by pre-push hook
			'no-with': 'error',
			'object-shorthand': 'error',
			'one-var': 'off',
			'operator-assignment': 'off', // turned off because it's a stylistic preference
			'prefer-arrow-callback': ['error', { allowUnboundThis: false }],
			'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
			'prefer-destructuring': 'error',
			'prefer-exponentiation-operator': 'error',
			'prefer-named-capture-group': 'error',
			'prefer-numeric-literals': 'error',
			'prefer-object-has-own': 'error',
			'prefer-object-spread': 'error',
			'prefer-promise-reject-errors': 'error',
			'prefer-regex-literals': ['error', { disallowRedundantWrapping: true }],
			'prefer-rest-params': 'error',
			'prefer-spread': 'error',
			'prefer-template': 'error',
			radix: 'error',
			'require-await': 'error',
			'require-unicode-regexp': 'off', // does not seem to work
			'require-yield': 'error',
			'sort-imports': 'off', // superseded by @ianvs/prettier-plugin-sort-imports
			'sort-keys': 'off', // turned off because it's a stylistic preference
			'sort-vars': 'off', // turned off because it's a stylistic preference
			strict: ['error', 'safe'],
			'symbol-description': 'error',
			'vars-on-top': 'error',
			yoda: 'off',
			// eslint layout & formatting
			'unicode-bom': 'off',
			// @typescript-eslint/eslint-plugin
			'@typescript-eslint/adjacent-overload-signatures': 'error',
			'@typescript-eslint/array-type': ['error', { default: 'generic', readonly: 'generic' }], // https://tkdodo.eu/blog/array-types-in-type-script
			'@typescript-eslint/await-thenable': 'error',
			'@typescript-eslint/ban-ts-comment': ['error', { 'ts-expect-error': 'allow-with-description' }],
			'@typescript-eslint/ban-tslint-comment': 'error',
			'@typescript-eslint/class-literal-property-style': 'error',
			'@typescript-eslint/class-methods-use-this': 'error',
			'@typescript-eslint/consistent-generic-constructors': 'error',
			'@typescript-eslint/consistent-indexed-object-style': 'error', // https://stackoverflow.com/a/72442129
			'@typescript-eslint/consistent-return': ['error', { treatUndefinedAsUnspecified: false }],
			// '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'never' }], // TODO: temporary until first chance to fix the underlying issue
			'@typescript-eslint/consistent-type-definitions': ['error', 'type'], // https://www.youtube.com/watch?v=zM9UPcIyyhQ
			'@typescript-eslint/consistent-type-exports': ['error', { fixMixedExportsWithInlineTypeSpecifier: true }],
			'@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }], // if a value is only used as a type e.g. `typeof someValue` this rule ensures the imported value is preceded by `type` specifier in the import statement
			'@typescript-eslint/default-param-last': 'error',
			'@typescript-eslint/dot-notation': ['error', { allowKeywords: true }],

			'@typescript-eslint/no-shadow': [
				'error',
				{ hoist: 'all', ignoreTypeValueShadow: false, ignoreFunctionTypeParameterNameValueShadow: false },
			],
			'@typescript-eslint/no-unnecessary-condition': 'error',
			'@typescript-eslint/no-unnecessary-type-assertion': 'error',
			'@typescript-eslint/strict-boolean-expressions': [
				'error',
				{
					allowAny: false,
					allowNullableBoolean: false,
					allowNullableEnum: false,
					allowNullableNumber: false,
					allowNullableObject: true, // type safe because objects, symbols, and functions don't have falsy values
					allowNullableString: false,
					allowNumber: false,
					allowString: true, // type safe because strings have only one falsy value i.e. ''
				},
			], // "jsx-expressions/strict-logical-expressions" doesn't catch similar logic errors outside JSX
			'@typescript-eslint/no-restricted-types': [
				'error',
				{
					types: {
						object: "There's a common misconception about 'object' type. Many think it represents an object but actually it represents any non-primitive value. Use 'Record<PropertyKey, unknown>' instead to represent an object.",
						// react
						'React.FC':
							'Easier to refactor to a generic component if needed: https://www.totaltypescript.com/you-can-stop-hating-react-fc',
						FC: 'Easier to refactor to a generic component if needed: https://www.totaltypescript.com/you-can-stop-hating-react-fc',
						'React.FunctionComponent':
							'Easier to refactor to a generic component if needed: https://www.totaltypescript.com/you-can-stop-hating-react-fc',
						FunctionComponent:
							'Easier to refactor to a generic component if needed: https://www.totaltypescript.com/you-can-stop-hating-react-fc',
						// dayjs
						'dayjs.Dayjs': 'Use DutchTimestampString instead. See README.md for details.',
						Dayjs: 'Use DutchTimestampString instead. See README.md for details.',
					},
				},
			],
			'@typescript-eslint/no-empty-object-type': 'error',
			'@typescript-eslint/no-unsafe-function-type': 'error',
			'@typescript-eslint/no-wrapper-object-types': 'error',
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-import-type-side-effects': 'error', // if only types are imported in a statement, ensures `import type {` syntax is used
			'@typescript-eslint/prefer-ts-expect-error': 'error',
			// eslint-plugin-unused-imports
			'unused-imports/no-unused-imports': 'error',
			'unused-imports/no-unused-vars': [
				// preferred over @typescript-eslint/no-unused-vars because it doesn't error on unused imports
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					vars: 'all',
					varsIgnorePattern: '^_', // ensures the rule applies to left out object properties by ignoreRestSiblings: false
					ignoreRestSiblings: false, // ensures left out object properties is intentional
				},
			],
			// eslint-plugin-react
			'react/boolean-prop-naming': ['error', { validateNested: true }],
			'react/button-has-type': 'error',
			'react/checked-requires-onchange-or-readonly': 'error',
			'react/default-props-match-prop-types': 'off', // unnecessary because of typescript
			'react/destructuring-assignment': [
				'error',
				'always',
				{ ignoreClassFields: false, destructureInSignature: 'always' },
			],
			'react/display-name': 'off',
			'react/forbid-component-props': [
				'error',
				{ forbid: [{ propName: 'style', message: 'Use `sx` instead of `style`' }] },
			],
			'react/forbid-dom-props': 'off',
			'react/forbid-elements': 'off',
			'react/forbid-foreign-prop-types': 'off', // unnecessary because of typescript
			'react/forbid-prop-types': 'off', // unnecessary because of typescript
			'react/forward-ref-uses-ref': 'off', // does not seem to work
			'react/function-component-definition': [
				'error',
				{ namedComponents: 'arrow-function', unnamedComponents: 'arrow-function' },
			],
			'react/hook-use-state': 'error',
			'react/iframe-missing-sandbox': 'error',
			'react/jsx-boolean-value': 'off', // turned off because it's a stylistic preference
			'react/jsx-child-element-spacing': 'off', // unnecessary because native HTML elements are disabled (see "react/forbid-elements")
			'react/jsx-closing-bracket-location': 'off', // turned off because it's a stylistic preference
			'react/jsx-closing-tag-location': 'off', // turned off because it's a stylistic preference
			'react/jsx-curly-brace-presence': ['error', 'never'],
			'react/jsx-curly-newline': 'off', // unnecessary because of prettier
			'react/jsx-curly-spacing': 'off', // unnecessary because of prettier
			'react/jsx-equals-spacing': 'off', // unnecessary because of prettier
			'react/jsx-filename-extension': 'off', // unnecessary because of typescript
			'react/jsx-first-prop-new-line': 'off', // unnecessary because of prettier
			'react/jsx-fragments': 'error',
			'react/jsx-handler-names': 'off', // turned off because it doesn't play well with react-form-hook
			'react/jsx-indent': 'off', // unnecessary because of prettier
			'react/jsx-indent-props': 'off', // unnecessary because of prettier
			'react/jsx-key': 'error',
			'react/jsx-max-depth': 'off', // turned off because it's a stylistic preference
			'react/jsx-max-props-per-line': 'off', // turned off because it's a stylistic preference
			'react/jsx-newline': 'off', // turned off because it's a stylistic preference
			'react/jsx-no-bind': 'off', // unnecessary because not using class components
			'react/jsx-no-comment-textnodes': 'error',
			'react/jsx-no-constructed-context-values': 'error',
			'react/jsx-no-duplicate-props': 'error',
			'react/jsx-no-leaked-render': 'off', // superseded by @typescript-eslint/strict-boolean-expressions
			'react/jsx-no-literals': 'off', // unnecessary in this project
			'react/jsx-no-script-url': ['error', { includeFromSettings: true }],
			'react/jsx-no-target-blank': 'off', // unnecessary because modern browsers set window.opener to null https://caniuse.com/mdn-html_elements_a_implicit_noopener
			'react/jsx-no-undef': 'off', // unnecessary because of typescript
			'react/jsx-no-useless-fragment': 'error',
			'react/jsx-one-expression-per-line': 'off', // unnecessary because of prettier
			'react/jsx-pascal-case': ['error', { allowNamespace: true }],
			'react/jsx-props-no-multi-spaces': 'off', // unnecessary because of prettier
			'react/jsx-props-no-spreading': 'off',
			'react/jsx-sort-default-props': 'off', // deprecated rule
			'react/jsx-sort-props': 'off', // not responsibility of a linter, if anything, should be handled by prettier-plugin-organize-attributes once it starts supporting JSX
			'react/jsx-space-before-closing': 'off', // deprecated rule
			'react/jsx-tag-spacing': 'off', // unnecessary because of prettier
			'react/jsx-uses-react': 'off', // unnecessary because of typescript
			'react/jsx-uses-vars': 'off', // unnecessary because of typescript
			'react/jsx-wrap-multilines': 'off', // unnecessary because of prettier
			'react/no-access-state-in-setstate': 'off', // unnecessary because class components aren't used
			'react/no-adjacent-inline-elements': 'off', // unnecessary because native HTML elements are disabled (see "react/forbid-elements")
			'react/no-array-index-key': 'error',
			'react/no-arrow-function-lifecycle': 'off', // unnecessary because class components aren't used
			'react/no-children-prop': 'error',
			'react/no-danger': 'error',
			'react/no-danger-with-children': 'error',
			'react/no-deprecated': 'error',
			'react/no-did-mount-set-state': 'off', // unnecessary because class components aren't used
			'react/no-did-update-set-state': 'off', // unnecessary because class components aren't used
			'react/no-direct-mutation-state': 'off', // unnecessary because class components aren't used
			'react/no-find-dom-node': 'error',
			'react/no-invalid-html-attribute': 'off', // unnecessary because of typescript
			'react/no-is-mounted': 'error',
			'react/no-multi-comp': 'off',
			'react/no-namespace': 'error',
			'react/no-object-type-as-default-prop': 'error',
			'react/no-redundant-should-component-update': 'off', // unnecessary because class components aren't used
			'react/no-render-return-value': 'off',
			'react/no-set-state': 'off', // unnecessary because class components aren't used
			'react/no-string-refs': 'error',
			'react/no-this-in-sfc': 'off', // unnecessary because class components aren't used
			'react/no-typos': 'off', // unnecessary because class components aren't used
			'react/no-unescaped-entities': 'error',
			'react/no-unknown-property': 'off', // unnecessary because of typescript
			'react/no-unsafe': 'off', // unnecessary because class components aren't used
			'react/no-unstable-nested-components': 'error',
			'react/no-unused-class-component-methods': 'off', // unnecessary because class components aren't used
			'react/no-unused-prop-types': 'off', // unnecessary because of typescript
			'react/no-unused-state': 'off', // unnecessary because class components aren't used
			'react/no-will-update-set-state': 'off', // unnecessary because class components aren't used
			'react/prefer-es6-class': 'off', // unnecessary because class components aren't used
			'react/prefer-exact-props': 'off', // unnecessary because of typescript
			'react/prefer-read-only-props': 'off', // too heavy handed
			'react/prefer-stateless-function': 'error',
			'react/prop-types': 'off', // doesn't work as expected with React.memo
			'react/react-in-jsx-scope': 'off', // unnecessary because of next.js
			'react/require-default-props': 'off', //unnecessary because of typescript
			'react/require-optimization': 'off', // unnecessary because class components aren't used
			'react/require-render-return': 'off', // unnecessary because class components aren't used
			'react/self-closing-comp': 'error',
			'react/sort-comp': 'off', // unnecessary because class components aren't used
			'react/sort-default-props': 'off', // unnecessary because class components aren't used
			'react/sort-prop-types': 'off', // unnecessary because class components aren't used
			'react/state-in-constructor': 'off', // unnecessary because class components aren't used
			'react/static-property-placement': 'off', // unnecessary because class components aren't used
			'react/style-prop-object': 'off', // unnecessary because of typescript
			'react/void-dom-elements-no-children': 'error',
			// eslint-plugin-react-hooks
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'error',
			// eslint-plugin-react-compiler
			'react-compiler/react-compiler': 'error',
			// eslint-plugin-jsx-a11y
			'jsx-a11y/accessible-emoji': 'off', // deprecated rule
			'jsx-a11y/alt-text': [
				'error',
				{
					elements: ['img', 'object', 'area', 'input[type="image"]'],
					img: ['Image'],
					object: [],
					area: [],
					'input[type="image"]': [],
				},
			],
			'jsx-a11y/anchor-ambiguous-text': ['error', { words: ['more', 'read more', 'link', 'click here'] }],
			'jsx-a11y/anchor-has-content': ['error', { components: ['Link', 'AppLink'] }],
			'jsx-a11y/anchor-is-valid': 'error', // https://stackoverflow.com/questions/70585870/eslint-error-storybook-react-should-be-listed-in-the-projects-dependencies
			'jsx-a11y/aria-activedescendant-has-tabindex': 'error',
			'jsx-a11y/aria-props': 'error',
			'jsx-a11y/aria-proptypes': 'error',
			'jsx-a11y/aria-role': [
				'error',
				{
					allowedInvalidRoles: ['text'], // https://axesslab.com/text-splitting/
					ignoreNonDOM: true,
				},
			],
			'jsx-a11y/aria-unsupported-elements': 'error',
			'jsx-a11y/autocomplete-valid': 'error',
			'jsx-a11y/click-events-have-key-events': 'error',
			'jsx-a11y/control-has-associated-label': 'error',
			'jsx-a11y/heading-has-content': 'error',
			'jsx-a11y/html-has-lang': 'error',
			'jsx-a11y/iframe-has-title': 'error',
			'jsx-a11y/img-redundant-alt': ['error', { components: ['Image'] }],
			'jsx-a11y/interactive-supports-focus': 'error',
			'jsx-a11y/label-has-associated-control': 'error',
			'jsx-a11y/label-has-for': 'off', // deprecated rule
			'jsx-a11y/lang': 'error',
			'jsx-a11y/media-has-caption': 'error',
			'jsx-a11y/mouse-events-have-key-events': 'error',
			'jsx-a11y/no-access-key': 'error',
			'jsx-a11y/no-aria-hidden-on-focusable': 'error',
			'jsx-a11y/no-autofocus': 'error',
			'jsx-a11y/no-distracting-elements': 'error',
			'jsx-a11y/no-interactive-element-to-noninteractive-role': 'error',
			'jsx-a11y/no-noninteractive-element-interactions': [
				'error',
				{ handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'] },
			],
			'jsx-a11y/no-noninteractive-element-to-interactive-role': [
				'error',
				{
					ul: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
					ol: ['listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid'],
					li: ['menuitem', 'option', 'row', 'tab', 'treeitem'],
					table: ['grid'],
					td: ['gridcell'],
				},
			],
			'jsx-a11y/no-noninteractive-tabindex': ['error', { tags: [], roles: ['tabpanel'], allowExpressionValues: true }],
			'jsx-a11y/no-onchange': 'off', // deprecated rule
			'jsx-a11y/no-redundant-roles': 'error',
			'jsx-a11y/no-static-element-interactions': [
				'error',
				{
					handlers: ['onClick', 'onMouseDown', 'onMouseUp', 'onKeyPress', 'onKeyDown', 'onKeyUp'],
					allowExpressionValues: true,
				},
			],
			'jsx-a11y/prefer-tag-over-role': 'error',
			'jsx-a11y/role-has-required-aria-props': 'error',
			'jsx-a11y/role-supports-aria-props': 'error',
			'jsx-a11y/scope': 'error',
			'jsx-a11y/tabindex-no-positive': 'error',
			// @shopify/eslint-plugin
			'@shopify-eslint-plugin/prefer-early-return': 'error',
			// eslint-plugin-regex
			'regex/invalid': [
				'error',
				[
					{
						message: 'Custom hex colors are not allowed. Use color palette instead.',
						regex: '(?<!&)#(?:[a-fA-F0-9]{6}|[a-fA-F0-9]{3})',
					},
				],
			],
		},
	},
	{
		files: [
			'next.config.ts',
			'src/app/**/layout.tsx',
			'src/app/**/page.tsx',
			'src/app/**/default.tsx',
			'src/app/**/not-found.tsx',
			'kysely.config.ts',
			'vitest.config.ts',
			'prettier.config.ts',
		],
		rules: { 'no-restricted-exports': 'off' },
	},
	{
		plugins: { 'jest-dom': jestDomPlugin },
		files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.test.ts', '**/*.test.tsx'],
		rules: {
			// eslint suggestions
			'no-magic-numbers': 'off',
			// eslint-plugin-react
			'react/forbid-elements': 'off',
			// eslint-plugin-jest-dom
			'jest-dom/prefer-checked': 'error',
			'jest-dom/prefer-empty': 'error',
			'jest-dom/prefer-enabled-disabled': 'error',
			'jest-dom/prefer-focus': 'error',
			'jest-dom/prefer-in-document': 'error',
			'jest-dom/prefer-required': 'error',
			'jest-dom/prefer-to-have-attribute': 'error',
			'jest-dom/prefer-to-have-class': 'error',
			'jest-dom/prefer-to-have-style': 'error',
			'jest-dom/prefer-to-have-text-content': 'error',
			'jest-dom/prefer-to-have-value': 'error',
		},
	},
]
