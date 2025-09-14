import type { ComponentProps } from 'react'

import styles from './Button.module.css'

type ButtonProps = Omit<ComponentProps<'button'>, 'type'> & { type: Exclude<ComponentProps<'button'>['type'], undefined> }

export const Button = ({ children, className = '', type, ...props }: ButtonProps) => {
	return (
		// eslint-disable-next-line react/button-has-type
		<button className={`${styles.button} ${className}`} {...props} type={type}>
			{children}
		</button>
	)
}
