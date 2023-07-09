import classes from './CodeBlock.module.css'
import type { JSXInternal } from 'preact/src/jsx'
import type { Ref } from 'preact'
import { forwardRef } from 'preact/compat'

type CodeBlockProps = JSXInternal.HTMLAttributes<HTMLPreElement>

export const CodeBlock = forwardRef(({ class: className, children }: CodeBlockProps, ref: Ref<HTMLPreElement>) => {
	return (
		<pre class={`${classes.preBlock} ${className || ''}`} ref={ref}>
			<code class={classes.blockCode}>{children}</code>
		</pre>
	)
})
