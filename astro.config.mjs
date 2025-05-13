import { defineConfig } from 'astro/config'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
	// TODO: compare the build output with and without this property
	site: 'https://responsify.dev',
	trailingSlash: 'always',
	integrations: [react()],
})
