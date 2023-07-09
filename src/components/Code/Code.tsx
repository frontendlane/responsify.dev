import type { FunctionalComponent } from 'preact'
import classes from './Code.module.css'
import type { JSXInternal } from 'preact/src/jsx'

type CodeProps = JSXInternal.HTMLAttributes<HTMLElement>

export const Code: FunctionalComponent<CodeProps> = ({ className, children, ...props }) => {
	return (
		<code className={`${className || ''} ${classes.inlineCode}`} {...props}>
			{children}
		</code>
	)
}
