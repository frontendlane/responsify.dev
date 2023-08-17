module.exports = () => ({
	map: {
		// TODO: verify sourcemaps are loaded, vite also has this setting: css.devSourcemap
		inline: false,
	},
	plugins: {
		'postcss-media-minmax': {},
		'postcss-import': {},
		autoprefixer: {},
		cssnano: { preset: ['cssnano-preset-default'] },
	},
})

// even for postcss files the name of prettier's parser is `css`
