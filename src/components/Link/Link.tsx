import type { FunctionalComponent } from 'preact'
import classes from './Link.module.css'
import type { JSXInternal } from 'preact/src/jsx'

type Href = `#${string}` | string

// TODO: JSXInternal??? or something else?? check what Matt Pocock says
export type Props = Omit<JSXInternal.HTMLAttributes<HTMLAnchorElement>, 'href'> & {
	href: Href
}

// <!-- TODO: add classNames devDependency -->
export const Link: FunctionalComponent<Props> = ({ className, href, children, ...props }) => {
	const isExternalLink = href.startsWith('http') || href.startsWith('//')
	return (
		<a
			{...props}
			href={href}
			class={`${className ? className : ''} ${classes.link}`}
			{...(isExternalLink ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
		>
			{children}
		</a>
	)
}
