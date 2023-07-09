import type { FunctionalComponent } from 'preact'
import type { JSXInternal } from 'preact/src/jsx'

import classes from './Button.module.css'

export const Button: FunctionalComponent<JSXInternal.HTMLAttributes<HTMLButtonElement>> = ({
	children,
	class: className,
	...props
}) => {
	return (
		<button className={`${classes.button} ${className || ''}`} {...props}>
			{children}
		</button>
	)
}
