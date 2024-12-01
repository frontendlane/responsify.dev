import styles from './CodeBlock.module.css'
import { forwardRef, type ComponentProps, type Ref } from 'react'

type CodeBlockProps = ComponentProps<'pre'>

export const CodeBlock = forwardRef(({ className, children }: CodeBlockProps, ref?: Ref<HTMLPreElement>) => {
	return (
		<pre className={`${styles.preBlock} ${className || ''}`} {...(ref ? { ref } : {})}>
			<code className={styles.blockCode}>{children}</code>
		</pre>
	)
})
