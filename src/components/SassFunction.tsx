import { Section } from './Section'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'

export const SassFunction = () => {
	return (
		<Section className="verticalSpacing150Percent" heading={headings.h2_5}>
			<p className="verticalSpacing">
				You can use responsify as a Sass <Code>@function</Code>.{' '}
				<Link href="/_responsify.scss.zip" download data-file-format=".zip" data-file-size="1,170 bytes">
					Download <Code>_responsify.scss</Code>
				</Link>
				, unzip it, and import it to your root Sass file. Usage examples are included in the file.
			</p>
			<p className="verticalSpacing">
				The advantage of using the Sass <Code>@function</Code> is that you don&apos;t need comments documenting input
				values. 🙌
			</p>
			<p className="verticalSpacing">
				Note that at the moment, Sass <Code>@function</Code> doesn&apos;t support <Code>ch</Code> and{' '}
				<Code>rem</Code> units. 😞
			</p>
		</Section>
	)
}
