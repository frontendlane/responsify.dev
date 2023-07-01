import type { FunctionalComponent } from 'preact'
import classes from './CodeBlock.module.css'

export const CodeBlock: FunctionalComponent = ({ children }) => {
	return (
		<pre class={classes.preBlock}>
			<code class={classes.blockCode}>{children}</code>
		</pre>
	)
}
