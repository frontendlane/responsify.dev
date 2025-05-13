import type { ComponentProps, FC } from 'react'
import styles from './Code.module.css'

type CodeProps = ComponentProps<'code'>

export const Code: FC<CodeProps> = ({ className, children, ...props }) => {
	return (
		<code className={`${className || ''} ${styles.inlineCode}`} {...props}>
			{children}
		</code>
	)
}
