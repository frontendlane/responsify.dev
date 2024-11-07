import type { ComponentProps, FC } from 'react'

import classes from './Button.module.css'

export const Button: FC<ComponentProps<'button'>> = ({ children, className, ...props }) => {
	return (
		<button className={`${classes.button} ${className || ''}`} {...props}>
			{children}
		</button>
	)
}
