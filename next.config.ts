import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	eslint: {
		dirs: ['.'], // https://stackoverflow.com/a/71284119
	},
	experimental: {
		reactCompiler: true,
	},
}

export default nextConfig
