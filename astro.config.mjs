import { defineConfig } from 'astro/config'

import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
	// TODO: compare the build output with and without this property
	site: 'https://responsify.dev',
	trailingSlash: 'always',
	integrations: [preact({ compat: true })],
})
