module.exports = () => ({
	map: {
		// TODO: verify sourcemaps are loaded, vite also has this setting: css.devSourcemap
		inline: false,
	},
	plugins: {
		// 'postcss-media-minmax': {},
		// 'postcss-focus-visible': {},
		// 'postcss-import': {},
		// autoprefixer: {},
		// cssnano: { preset: ['cssnano-preset-default'] },
	},
})
