import type { FC } from 'react'
import { Section } from '../Section'
import { Updates } from '../Updates'
import styles from './Intro.module.css'
import { Code } from '../Code/Code'
import { headings } from '../TableOfContents/TableOfContents'
import { Video } from '../Video/Video'
import { CodeBlock } from '../CodeBlock/CodeBlock'

export const Intro: FC = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_1}>
			<CodeBlock>window.on(&quot;resize&quot;, preventAbruptLayoutShift)</CodeBlock>

			<p className="vertical-spacing">
				At my past job at a digital agency I transformed Photoshop, Sketch, and InVision designs into functioning
				websites. But the designs gave no instructions on how to handle the in-between resolutions.{' '}
				<span aria-hidden="true">☹️</span> So, to minimize the abrupt layout jumps I employed a technique I call
				responsify, which uses CSS <Code>calc()</Code> function to <em>fluidly</em> change <Code>width</Code>,{' '}
				<Code>margin</Code>, <Code>left</Code>, etc. at breakpoints.
			</p>
			<p className="vertical-spacing">
				Many told me they didn&apos;t understand what responsify is/does until they saw it in action.{' '}
				<span aria-hidden="true">💡</span> So, below&apos;s a screen recording of an example.
			</p>

			<Video />

			{/* TODO: neat, but why should I care? users rarely resize their browser, right? */}

			<pre className={styles.preBlock}>
				<blockquote className={styles.blockquote}>
					<b className={styles.term}>responsify</b>
					{`
    `}
					<i className={styles.termType}>verb</i>
					{`
        `}
					to make an HTML element fluidly adapt to changes in viewport size
				</blockquote>
			</pre>

			<p className="vertical-spacing">Read on to learn how to use it in your project.</p>

			<Updates />
		</Section>
	)
}
