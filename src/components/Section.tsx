import type { ComponentProps } from 'react'
import type { HeadingShape } from './TableOfContents/TableOfContents'
import { Heading } from './Heading/Heading'

export type SectionProps = ComponentProps<'h1'> & {
	heading: HeadingShape
}

export const Section = ({ heading, children, ...props }: SectionProps) => {
	return (
		<section {...props} aria-labelledby={heading.id}>
			<Heading level={heading.level} id={heading.id}>
				{heading.content}
			</Heading>
			{children}
		</section>
	)
}
