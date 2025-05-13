import type { FC } from 'react'
import classes from './HeadingLink.module.css'

type HeadingLinkProps = {
	id: string
}

export const HeadingLink: FC<HeadingLinkProps> = ({ id }) => {
	return (
		<a className={classes.anchor} href={`#${id}`} aria-labelledby={id}>
			#
		</a>
	)
}
