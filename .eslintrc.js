module.exports = {
	env: {
		browser: true,
		es2021: true
	},
	extends: ['standard-with-typescript', 'plugin:react/recommended', 'prettier'],
	overrides: [
		{
			env: {
				node: true
			},
			files: ['.eslintrc.{js,cjs}'],
			parserOptions: {
				sourceType: 'script'
			}
		}
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},
	plugins: ['react'],
	rules: {
		'@typescript-eslint/explicit-function-return-type': 'off',
		'react/react-in-jsx-scope': 'off',
		' @typescript-eslint/no-confusing-void-expression': 'off',
		'@typescript-eslint/strict-boolean-expressions': 'off',
		'@typescript-eslint/no-misused-promises': 'off',
		'react/no-unescaped-entities': 'off',
		'@typescript-eslint/naming-convention': 'off',
		'react/prop-types': [
			2,
			{ ignore: ['className', 'sideOffset', 'checked', 'align', 'position', 'orientation', 'decorative'] }
		]
	}
}
