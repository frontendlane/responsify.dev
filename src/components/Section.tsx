import type { FunctionalComponent } from 'preact'
import type { JSXInternal } from 'preact/src/jsx'
import { Heading } from './Heading/Heading'
import type { HeadingShape } from './TableOfContents/TableOfContents'

export type Props = JSXInternal.HTMLAttributes<HTMLElement> & {
	heading: HeadingShape
}

export const Section: FunctionalComponent<Props> = ({ heading, children, ...props }) => {
	return (
		<section {...props} aria-labelledby={heading.id}>
			<Heading element={heading.element} id={heading.id} renderContent={heading.renderContent} />
			{children}
		</section>
	)
}