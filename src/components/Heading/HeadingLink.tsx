import type { FunctionalComponent } from 'preact'
import classes from './HeadingLink.module.css'

type HeadingLinkProps = {
	id: string
}

export const HeadingLink: FunctionalComponent<HeadingLinkProps> = ({ id }) => {
	return (
		<a class={classes.anchor} href={`#${id}`} aria-labelledby={id}>
			#
		</a>
	)
}
