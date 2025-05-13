// TODO: add option to make prettier deterministic when https://github.com/prettier/prettier/pull/16163 is shipped
const config = {
	semi: false,
	singleQuote: true,
	htmlWhitespaceSensitivity: 'strict', // only relevant in .html and .htm files
	// printWidth: 125, // unnecessary because of `max_line_length` in .editorconfig
	// useTabs: true, // unnecessary because of `indent_style` in .editorconfig
	// tabWidth: 4, // unnecessary because of `indent_size` in .editorconfig
}

export default config
