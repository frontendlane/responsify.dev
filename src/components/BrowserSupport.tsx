import type { FC } from 'react'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'
import { Section } from './Section'

export const BrowserSupport: FC = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_6}>
			<p className="vertical-spacing">
				Browser support is very good. In spite of IE having{' '}
				<Link href="https://caniuse.com/calc/">
					known issues with <Code>calc()</Code>
				</Link>{' '}
				I haven't encountered any. Two of the examples use <Code>clamp()</Code> and <Code>min()</Code>, which IE
				doesn't support. As far as "exotic" 🐠 CSS values go: <Code>vw</Code> is supported by all browsers and{' '}
				<Code>ch</Code> is narrower on IE compared to other browsers, so just look out for that.
			</p>
		</Section>
	)
}
