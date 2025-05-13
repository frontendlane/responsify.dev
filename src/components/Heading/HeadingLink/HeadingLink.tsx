import type { FC } from 'react'
import styles from './HeadingLink.module.css'

type HeadingLinkProps = {
	id: string
}

export const HeadingLink: FC<HeadingLinkProps> = ({ id }) => {
	return (
		<a className={styles.anchor} href={`#${id}`} aria-labelledby={id}>
			#
		</a>
	)
}
