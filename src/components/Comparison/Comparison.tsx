import { Section } from '../Section'
import styles from './Comparison.module.css'
import { Code } from '../Code/Code'
import { Link } from '../Link/Link'
import { headings } from '../TableOfContents/TableOfContents'
import { ComparisonTable } from './ComparisonTable'

export const Comparison = () => {
	return (
		<Section className="verticalSpacing150Percent" heading={headings.h2_7}>
			<p className="verticalSpacing">
				CSS locks originated as{' '}
				<Link href="https://tbrown.org/notes/2012/02/03/molten-leading-or-fluid-line-height/">Molten leading</Link>.
				In the article that introduced the concept and in almost every example I came across CSS locks are used for
				controlling <Code>line-height</Code> and <Code>font-size</Code>, even though it works with many CSS
				properties.
			</p>
			<p className="verticalSpacing">
				CSS locks and responsify are based on fundamentally the same logic/math and as such share many similarities.
				They both:
			</p>
			<ul className={styles.ul}>
				<li>
					work with CSS properties that accept a <Code>px</Code> value,
				</li>
				<li>
					don&apos;t work with properties that accept keyword value like <Code>visibility</Code>,
				</li>
				<li>
					don&apos;t work with properties that accept a unitless value like <Code>z-index</Code>.
				</li>
			</ul>
			<p className="verticalSpacing">
				There are also a few differences, most notable are listed in the following table.
			</p>
			<ComparisonTable />
		</Section>
	)
}
