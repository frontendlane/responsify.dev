import type { ComponentProps, FC } from 'react'
import styles from './Link.module.css'

type Href = `#${string}` | string

export type LinkProps = Omit<ComponentProps<'a'>, 'href'> & {
	href: Href
}

// <!-- TODO: add classNames devDependency -->
export const Link: FC<LinkProps> = ({ className, href, children, ...props }) => {
	const isExternalLink = href.startsWith('http') || href.startsWith('//')
	return (
		<a
			{...props}
			href={href}
			className={`${className || ''} ${styles.link}`}
			{...(isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
		>
			{children}
		</a>
	)
}
