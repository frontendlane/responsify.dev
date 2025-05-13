import type { FC } from 'react'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'
import { Section } from './Section'

export const BrowserSupport: FC = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_6}>
			<p className="vertical-spacing">
				Browser support for calc() is <del>very good</del> <ins>practically universal</ins>.
			</p>
			<p className="vertical-spacing">
				<s>
					In spite of IE having{' '}
					<Link href="https://caniuse.com/calc/">
						known issues with <Code>calc()</Code>
					</Link>{' '}
					I haven&apos;t encountered any. Two of my examples above use <Code>clamp()</Code> and <Code>min()</Code>,
					which IE doesn&apos;t support. As far as the &quot;exotic&quot; 🐠 CSS values that I used in my examples
					go: <Code>vw</Code> is supported by all browsers and <Code>ch</Code> is narrower on IE compared to other
					browsers, so just look out for that.
				</s>{' '}
			</p>
			<p className="vertical-spacing">IE should really be irrelevant in {new Date().getFullYear()}. 🪦</p>
		</Section>
	)
}
