import type { FunctionalComponent } from 'preact'
import classes from './Code.module.css'
import type { JSXInternal } from 'preact/src/jsx'

type Props = JSXInternal.HTMLAttributes<HTMLElement>

export const Code: FunctionalComponent<Props> = ({ className, children, ...props }) => {
	return (
		<code className={`${className || ''} ${classes.inlineCode}`} {...props}>
			{children}
		</code>
	)
}
