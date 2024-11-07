import classes from './CodeBlock.module.css'
import { forwardRef, type ComponentProps, type Ref } from 'react'

type CodeBlockProps = ComponentProps<'pre'>

export const CodeBlock = forwardRef(({ className, children }: CodeBlockProps, ref?: Ref<HTMLPreElement>) => {
	return (
		<pre className={`${classes.preBlock} ${className || ''}`} {...(ref ? { ref } : {})}>
			<code className={classes.blockCode}>{children}</code>
		</pre>
	)
})
