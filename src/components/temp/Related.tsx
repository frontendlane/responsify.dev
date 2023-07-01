import type { FunctionalComponent } from 'preact'
import { Link } from '../Link/Link'
import { headings } from '../TableOfContents/TableOfContents'
import { Code } from './Code'
import { Section } from './Section'

export const Related: FunctionalComponent = () => {
	return (
		<Section class="vertical-spacing-150-percent" heading={headings.h2_8}>
			<p class="vertical-spacing">
				There's a similar tool that can
				<Link href="https://andersriggelsen.dk/nonlinear/">
					generate <em>non-linear</em>
					<Code>calc()</Code> value
				</Link>
				.
			</p>
			<p class="vertical-spacing">
				For more awesomeness, James Gilyead and Trys Mudford created{' '}
				<Link href="https://utopia.fyi/">"Utopia" design system</Link> where elements scale proportionally and
				fluidly. It's an unconventional approach that uses a whole lot of <Code>calc()</Code>, CSS variables,{' '}
				<Code>rem</Code> and
				<Code>vw</Code> relative units, all tied together with what seems to me as undecipherable math. Fascinating
				stuff. 🧠
			</p>
		</Section>
	)
}
