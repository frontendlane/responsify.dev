module.exports = {
	semi: false,
	singleQuote: true,
	htmlWhitespaceSensitivity: 'strict',
	// useTabs: true, // this setting is unnecessary because it's taken care of by .editorconfig
	// tabWidth: 4, // this setting is unnecessary because it's taken care of by .editorconfig
	plugins: [require.resolve('prettier-plugin-astro')], // needed to format .astro files: https://github.com/withastro/prettier-plugin-astro#pnpm-support-1
	overrides: [
		{
			files: '**/*.astro', // needed to format .astro files: https://github.com/withastro/prettier-plugin-astro#pnpm-support-1
			options: {
				parser: 'astro', // needed to format .astro files: https://github.com/withastro/prettier-plugin-astro#pnpm-support-1
			},
		},
	],
}
