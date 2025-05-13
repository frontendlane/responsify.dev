import type { ComponentProps, FC } from 'react'

import styles from './Button.module.css'

export const Button: FC<ComponentProps<'button'>> = ({ children, className, ...props }) => {
	return (
		<button className={`${styles.button} ${className || ''}`} {...props}>
			{children}
		</button>
	)
}
