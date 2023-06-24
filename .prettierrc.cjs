module.exports = {
	semi: false,
	singleQuote: true,
	htmlWhitespaceSensitivity: 'strict',
	// useTabs: true, // unnecessary because it's taken care of by .editorconfig
	// tabWidth: 4, // unnecessary because it's taken care of by .editorconfig

	plugins: [require.resolve('prettier-plugin-astro')],
	overrides: [
		{
			files: '*.astro',
			options: {
				parser: 'astro',
			},
		},
	],
}
