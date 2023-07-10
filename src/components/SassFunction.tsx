import type { FunctionalComponent } from 'preact'
import { Section } from './Section'
import { Code } from './Code/Code'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'

export const SassFunction: FunctionalComponent = () => {
	return (
		<Section class="vertical-spacing-150-percent" heading={headings.h2_5}>
			<p class="vertical-spacing">
				You can use responsify as a Sass <Code>@function</Code>.{' '}
				<Link href="/_responsify.scss.zip" download data-fileFormat=".zip" data-fileSize="1,170 bytes">
					Download <Code>_responsify.scss</Code>
				</Link>
				, unzip it, and import it to your root Sass file. Usage examples are included in the file.
			</p>
			<p class="vertical-spacing">
				The advantage of using the Sass <Code>@function</Code> is that you don't need comments documenting input
				values. 🙌
			</p>
			<p class="vertical-spacing">
				Note that at the moment, Sass <Code>@function</Code> doesn't support <Code>ch</Code> and <Code>rem</Code>{' '}
				units. 😞
			</p>
		</Section>
	)
}
