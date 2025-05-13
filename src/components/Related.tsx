import type { FC } from 'react'
import { Section } from './Section'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'

export const Related: FC = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_8}>
			<p className="vertical-spacing">
				There's a similar tool that can{' '}
				<Link href="https://andersriggelsen.dk/nonlinear/">
					generate <em>non-linear</em> <Code>calc()</Code> value
				</Link>
				.
			</p>
			<p className="vertical-spacing">
				For more awesomeness, James Gilyead and Trys Mudford created{' '}
				<Link href="https://utopia.fyi/">"Utopia" design system</Link> where elements scale proportionally and
				fluidly. It's an unconventional approach that uses a whole lot of <Code>calc()</Code>, CSS variables,{' '}
				<Code>rem</Code> and <Code>vw</Code> relative units, all tied together with what seems to me as
				undecipherable math. Fascinating stuff. 🧠
			</p>
		</Section>
	)
}
