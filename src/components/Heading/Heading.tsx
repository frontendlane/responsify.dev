import { Fragment, type FunctionComponent } from 'react'

import { HeadingLink } from './HeadingLink'
import classes from './Heading.module.css'
import { getTextContent } from './getTextContent'

export type HeadingElement = 'h1' | 'h2' | 'h3'

type HeadingProps = {
	element: HeadingElement
	id: string
	renderContent: () => any
}

export const Heading: FunctionComponent<HeadingProps> = ({ element: HeadingElement, id, renderContent }) => {
	const content = renderContent()
	const isPlaintext = typeof content.props.children === 'string'
	const plaintext = getTextContent(content.props.children)

	return isPlaintext ? (
		<>
			<HeadingElement id={id}>{content}</HeadingElement>
			<HeadingLink id={id} />
		</>
	) : (
		<div className={classes.headingContainer}>
			<HeadingElement className={classes.screenReaderHeading}>{plaintext}</HeadingElement>
			<HeadingElement id={id} aria-hidden="true">
				{content}
			</HeadingElement>
			<HeadingLink id={id} />
		</div>
	)
}
