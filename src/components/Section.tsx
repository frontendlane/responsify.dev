import type { ComponentProps, FC } from 'react'
import { Heading } from './Heading/Heading'
import type { HeadingShape } from './TableOfContents/TableOfContents'

export type SectionProps = ComponentProps<'h1'> & {
	heading: HeadingShape
}

export const Section: FC<SectionProps> = ({ heading, children, ...props }) => {
	return (
		<section {...props} aria-labelledby={heading.id}>
			<Heading level={heading.level} id={heading.id}>
				{heading.content}
			</Heading>
			{children}
		</section>
	)
}
