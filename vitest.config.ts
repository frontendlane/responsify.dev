import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true, // necessary to play nice with @testing-library/jest-dom
		alias: {
			'@/': '/src/', // matches alias under "paths" in tsconfig.json
		},
		environment: 'jsdom', // necessary to be able to inspect what's "rendered" in the "document"
		setupFiles: ['./src/setupTests.ts'],
	},
})
