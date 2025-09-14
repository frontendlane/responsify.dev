import type { ComponentProps } from 'react'
import styles from './Code.module.css'

type CodeProps = ComponentProps<'code'>

export const Code = ({ className = '', children, ...props }: CodeProps) => {
	return (
		<code className={`${className} ${styles.inlineCode}`} {...props}>
			{children}
		</code>
	)
}
