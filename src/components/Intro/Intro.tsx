import type { FunctionalComponent } from 'preact'
import { Section } from '../Section'
import { Updates } from '../Updates'
import classes from './Intro.module.css'
import { Code } from '../Code/Code'
import { headings } from '../TableOfContents/TableOfContents'
import { Video } from '../Video/Video'
import { CodeBlock } from '../CodeBlock/CodeBlock'

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

			<CodeBlock>window.on('resize', preventAbruptLayoutShift)</CodeBlock>

			<p class="vertical-spacing">
				At my past job at a digital agency I transformed Photoshop, Sketch, and InVision designs into functioning
				websites. But the designs gave no instructions on how to handle the in-between resolutions.{' '}
				<span aria-hidden="true">☹️</span> So, to minimize the abrupt layout jumps I employed a technique I call
				responsify, which uses CSS <Code>calc()</Code> function to <em>fluidly</em> change <Code>width</Code>,{' '}
				<Code>margin</Code>, <Code>left</Code>, etc. so they match the value at the neighboring breakpoint.
			</p>
			<p class="vertical-spacing">
				<span aria-hidden="true">🤨</span> If you're still unclear what exactly it is and how it works, you're not
				alone. Many told me it didn't click for them until they saw it in action. <span aria-hidden="true">💡</span>{' '}
				So, below's a screen recording of an example.
			</p>

			<Video />

			{/* TODO: neat, but why should I care? users rarely resize their browser, right? */}

			<p class="vertical-spacing">Read on to learn how to use it in your project.</p>

			<Updates />
		</Section>
	)
}
