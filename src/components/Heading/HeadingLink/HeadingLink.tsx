import styles from './HeadingLink.module.css'

type HeadingLinkProps = {
	id: string
}

export const HeadingLink = ({ id }: HeadingLinkProps) => {
	return (
		<a className={styles.anchor} href={`#${id}`} aria-labelledby={id}>
			#
		</a>
	)
}
