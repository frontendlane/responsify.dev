import { HeadingLink } from './HeadingLink/HeadingLink'
import styles from './Heading.module.css'
import { getTextContent } from '../../utils/getTextContent'
import { generateValidId } from '@/utils/generateValidId'
import { isPlaintextLike } from '@/utils/isPlaintextLike'
import { isNullish } from '@/utils/isNullish'

export type HeadingLevel = 'h1' | 'h2' | 'h3'

type HeadingProps = React.PropsWithChildren & {
	level: HeadingLevel
	id: string
}

// seems like these solutions only work in safari (maybe chrome as well) but not in firefox
// https://axesslab.com/text-splitting/
// https://www.tpgi.com/using-the-text-role/
// https://tinytip.co/tips/a11y-voiceover-text-role/
// https://lab.dotjay.com/tests/screen-readers/voiceover-text-breaks-workarounds/
export const Heading = ({ level: HeadingElement, id, children }: HeadingProps) => {
	// TODO: add tests
	if (isNullish(children) || typeof children === 'boolean') {
		return ''
	}

	const validId = generateValidId(id)

	return isPlaintextLike(children) ? (
		<>
			<HeadingElement className={styles.heading} id={validId}>
				{children}
			</HeadingElement>
			<HeadingLink id={validId} />
		</>
	) : (
		<div className={styles.headingContainer}>
			<HeadingElement className={`${styles.heading} ${styles.screenReaderHeading}`}>
				{getTextContent(children)}
			</HeadingElement>
			<HeadingElement className={styles.heading} id={validId} aria-hidden="true">
				{children}
			</HeadingElement>
			<HeadingLink id={validId} />
		</div>
	)
}
