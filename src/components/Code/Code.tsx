import type { ComponentProps, FC } from 'react'
import classes from './Code.module.css'

type CodeProps = ComponentProps<'code'>

export const Code: FC<CodeProps> = ({ className, children, ...props }) => {
	return (
		<code className={`${className || ''} ${classes.inlineCode}`} {...props}>
			{children}
		</code>
	)
}
