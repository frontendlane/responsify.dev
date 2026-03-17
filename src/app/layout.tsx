// better to ts-expect-error once than to declare module ".css" in globals.d.ts
// @ts-expect-error TODO: temporary
import '../styles/reset.css'
// @ts-expect-error TODO: reset should go first. split reset into proper reset.css and baseline.css with variables being imported before baseline
import '../styles/variables.css'
// @ts-expect-error TODO: temporary
import '../styles/baseline.css'
// @ts-expect-error TODO: temporary
import '../styles/pages-index.css'
// @ts-expect-error TODO: temporary
import './../styles/overrides.css'
import type { PropsWithChildren } from 'react'

type RootLayoutProps = PropsWithChildren

const RootLayout = ({ children }: RootLayoutProps) => {
	return (
		<html lang="en-US">
			<head>
				<meta charSet="UTF-8" />
				{/*
					When the iPhone was first released, Safari had to render desktop websites on much smaller phone screens.
					Since many desktop websites assumed a 1024×768 resolution and/or used absolute positioning, they would have appeared broken on the phone.
					To make such websites somewhat usable, Safari “lied” about its viewport size: instead of reporting the actual screen resolution, it reported a larger, desktop-like resolution.
					As a result, websites appeared zoomed out but remained functional and visually intact.
					Later, other smartphones adopted the same approach, and today virtually all smartphones use this workaround.
					However, this created a problem for websites that wanted to provide an optimized experience for mobile users.
					So, to develop for devices' actual resolution developers need to
					1. first, force devices to report their actual screen resolution by including the following meta tag: <meta name="viewport" content="width=device-width,initial-scale=1">
					2. second, use media queries to target those small/actual resolutions
				*/}
				<meta name="viewport" content="width=device-width,initial-scale=1" />

				<link rel="canonical" href="https://responsify.dev" />

				{/* 1200 x 630 ideal resolution according to https://iamturns.com/open-graph-image-size/ */}
				{/* <meta property="og:image" content="https://responsify.dev/og-image.png" /> */}
				{/* TODO: One of image/jpeg, image/gif or image/png */}
				{/* <meta property="og:image:type" content="" /> */}
				{/* <meta property="og:image:width" content="xx" /> */}
				{/* <meta property="og:image:height" content="xx" /> */}

				{/* TODO: must be video/mp4 */}
				{/* <meta property="og:video" content="https://responsify.dev/og-video.mov" /> */}
				{/* <meta property="og:video:secure_url" content="https://responsify.dev/og-video.mov" /> */}
				{/* <meta property="og:video:type" content="video/mp4" /> */}
				{/* <meta property="og:video:width" content="xx" /> */}
				{/* <meta property="og:video:height" content="xx" /> */}
			</head>
			<body>{children}</body>
		</html>
	)
}

export default RootLayout
