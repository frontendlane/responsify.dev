import { Fragment, type FunctionComponent } from 'react'

import { HeadingLink } from './HeadingLink/HeadingLink'
import styles from './Heading.module.css'
import { getTextContent } from '../../utils/getTextContent'
import { generateValidId } from '@/utils/generateValidId'
import { isPlaintextLike } from '@/utils/isPlaintextLike'

export type HeadingLevel = 'h1' | 'h2' | 'h3'

type HeadingProps = React.PropsWithChildren & {
	level: HeadingLevel
	id: string
}

// context:
// https://axesslab.com/text-splitting/
// https://www.tpgi.com/using-the-text-role/
// https://tinytip.co/tips/a11y-voiceover-text-role/
// https://lab.dotjay.com/tests/screen-readers/voiceover-text-breaks-workarounds/
export const Heading: FunctionComponent<HeadingProps> = ({ level: HeadingElement, id, children }) => {
	const noWhitespaceId = generateValidId(id)

	return isPlaintextLike(children) ? (
		<>
			<HeadingElement className={styles.heading} id={noWhitespaceId}>
				{children}
			</HeadingElement>
			<HeadingLink id={noWhitespaceId} />
		</>
	) : (
		<div className={styles.headingContainer}>
			<HeadingElement className={`${styles.heading} ${styles.screenReaderHeading}`}>
				{getTextContent(children)}
			</HeadingElement>
			<HeadingElement className={styles.heading} id={noWhitespaceId} aria-hidden="true">
				{children}
			</HeadingElement>
			<HeadingLink id={noWhitespaceId} />
		</div>
	)
}
