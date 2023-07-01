import { Fragment, FunctionComponent } from 'preact'

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
		<Fragment>
			<HeadingElement id={id}>{content}</HeadingElement>
			<HeadingLink id={id} />
		</Fragment>
	) : (
		<div class={classes.headingContainer}>
			<HeadingElement class={classes.screenReaderHeading}>{plaintext}</HeadingElement>
			<HeadingElement id={id} aria-hidden="true">
				{content}
			</HeadingElement>
			<HeadingLink id={id} />
		</div>
	)
}
