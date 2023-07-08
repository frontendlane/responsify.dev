import type { FunctionalComponent } from 'preact'
import { Section } from '../Section'
import { Updates } from '../Updates'
import classes from './Intro.module.css'
import { Code } from '../Code/Code'
import { headings } from '../TableOfContents/TableOfContents'
import { Video } from '../Video/Video'

export const Intro: FunctionalComponent = () => {
	return (
		<Section class="vertical-spacing-150-percent" heading={headings.h2_1}>
			<pre class={classes.preBlock}>
				<blockquote class={classes.blockquote}>
					<b class={classes.term}>responsify</b>
					{`
    `}
					<i class={classes.termType}>verb</i>
					{`
        `}
					to make an HTML element fluidly adapt to changes in viewport size
				</blockquote>
			</pre>
			<p class="vertical-spacing">
				At my past job at a digital agency I transformed Photoshop, Sketch, and InVision designs into functioning
				websites. The design files usually featured disperate layouts for mobile <span aria-hidden="true">📱</span>,
				tablet, and desktop <span aria-hidden="true">🖥</span>. To smooth out the layout jump at breakpoints I
				employed a technique I call responsify, which uses CSS <Code>calc()</Code> function to <em>fluidly</em>{' '}
				change <Code>width</Code>, <Code>margin</Code>, <Code>left</Code>, etc. so it matches the value at the
				neighboring breakpoint.
			</p>
			<p class="vertical-spacing">Read on to learn how to use it in your project.</p>
			<Video />
			<Updates />
		</Section>
	)
}
