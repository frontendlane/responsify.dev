import { Section } from './Section'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'

export const Related = () => {
	return (
		<Section className="verticalSpacing150Percent" heading={headings.h2_8}>
			<p className="verticalSpacing">
				There&apos;s a similar tool that can{' '}
				<Link href="https://andersriggelsen.dk/nonlinear/">
					generate <em>non-linear</em> <Code>calc()</Code> value
				</Link>
				.
			</p>
			<p className="verticalSpacing">
				For more awesomeness, James Gilyead and Trys Mudford created{' '}
				<Link href="https://utopia.fyi/">&quot;Utopia&quot; design system</Link> where elements scale proportionally
				and fluidly. It&apos;s an awesome and somewhat unconventional approach that uses a whole lot of{' '}
				<Code>calc()</Code>, CSS variables, <Code>rem</Code> and <Code>vw</Code> relative units, all tied together
				with what seems to me as undecipherable math. Fascinating stuff. 🧠
			</p>
		</Section>
	)
}
