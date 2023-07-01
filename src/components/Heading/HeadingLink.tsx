import type { FunctionalComponent } from 'preact'
import classes from './HeadingLink.module.css'

type HeadingLinkProps = {
	id: string
}

export const HeadingLink: FunctionalComponent<HeadingLinkProps> = ({ id }) => {
	return (
		<span class={classes.aContainer}>
			<a class={classes.a} href={`#${id}`} aria-labelledby={id}>
				#
			</a>
		</span>
	)
}
