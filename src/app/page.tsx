import { BrowserSupport } from '@/components/BrowserSupport'
import { Comparison } from '@/components/Comparison/Comparison'
import { Dateline } from '@/components/Dateline'
import { Examples } from '@/components/Examples/Examples'
import { Footer } from '@/components/Footer/Footer'
import { Form } from '@/components/Form/Form'
import { Heading } from '@/components/Heading/Heading'
import { Intro } from '@/components/Intro/Intro'
import { Related } from '@/components/Related'
import { SassFunction } from '@/components/SassFunction'
import { headings, TableOfContents } from '@/components/TableOfContents/TableOfContents'
import type { Metadata } from 'next'

export const metadata: Metadata = {
	// TODO: inject this into package.json and manifest as well
	title: 'Responsify: Prevent abrupt layout shifts when users resize the browser',
	description: 'A CSS technique that helps developers prevent ugly layout jumps when users resize the browser.',
}

export default function Home() {
	return (
		<>
			<main aria-labelledby={headings.h1.id}>
				<article aria-labelledby={headings.h1.id}>
					<Heading level={headings.h1.level} id={headings.h1.id}>
						{headings.h1.content}
					</Heading>
					<p
						style={{
							fontSize: 'var(--font-size-h2)',
							letterSpacing: '-.01em',
							lineHeight: 1,
							wordSpacing: '.01em',
							marginBlockStart: '1rem',
						}}
					>
						Prevent abrupt layout shifts when users resize the browser
					</p>

					<Dateline />

					<Intro />

					<TableOfContents />

					<Examples />

					<Form />

					<SassFunction />

					<BrowserSupport />

					<Comparison />

					<Related />
				</article>
			</main>

			<Footer />

			{/* <Unorphan client:only="react" /> */}
		</>
	)
}
