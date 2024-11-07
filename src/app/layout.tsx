// TODO: do this only one.
// better to ts-expect-error once than to declare module ".css" in globals.d.ts
// @ts-expect-error TODO: temporary
import '../styles/variables.css'
// @ts-expect-error TODO: temporary
import '../styles/reset.css'
// @ts-expect-error TODO: temporary
import '../styles/pages-index.css'
// @ts-expect-error TODO: temporary
import './../styles/overrides.css'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en-US">
			<head>
				<meta charSet="UTF-8" />
				<meta name="viewport" content="width=device-width" />

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
