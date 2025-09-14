import styles from './CodeBlock.module.css'
import type { ComponentProps } from 'react'

type CodeBlockProps = ComponentProps<'pre'>

export const CodeBlock = ({ className = '', children, ref }: CodeBlockProps) => {
	return (
		<pre className={`${styles.preBlock} ${className}`} {...(ref ? { ref } : {})}>
			<code className={styles.blockCode}>{children}</code>
		</pre>
	)
}
