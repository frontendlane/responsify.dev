import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	reactStrictMode: true,
	output: 'standalone',
	reactCompiler: false, // compiler disabled until https://github.com/react-hook-form/react-hook-form/issues/12298 is resolved
}

export default nextConfig
