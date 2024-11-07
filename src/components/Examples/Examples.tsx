import { Code } from '../Code/Code'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { Link } from '../Link/Link'
import { Section } from '../Section'
import { headings } from '../TableOfContents/TableOfContents'

import classes from './Examples.module.css'
import type { FC } from 'react'

export const Examples: FC = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_3}>
			<p className="vertical-spacing">
				Examples assume smallest viewport width of 320px, a tablet breakpoint at 768px, and a desktop breakpoint at
				1024px.
			</p>
			<Section className="vertical-spacing-150-percent" heading={headings.h3_1}>
				<p className="vertical-spacing">
					Suppose a <Code>&lt;div&gt;</Code> needs to be 90% wide below desktop breakpoint and 40% above that.
					Because you practice mobile-first approach, you start with:
				</p>
				<CodeBlock>
					div &#123;
					{`
`}
					{`    `}width: 90%;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">and for desktop you add:</p>
				<CodeBlock>
					@media (min-width: 1024px) &#123;
					{`
`}
					{`    `}div &#123;
					{`
`}
					{`        `}width: 40%;
					{`
`}
					{`    `}&#125;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					You want to gradually transition between these two values so you reserve, let&apos;s say, the 900px -
					1024px range to smooth this out. You add another media query with the magic 🪄 <Code>calc()</Code> value
					that you generate using the <Link href={`#${headings.h2_4.id}`}>responsify form</Link> below and
					you&apos;re done! 🎉
				</p>
				<CodeBlock>
					@media (min-width: 900px) and (max-width: 1023px) &#123;
					{`
`}
					{`    `}div &#123;
					{`
`}
					{`        `}width: calc(3716.129px - 322.903%); /* https://responsify.dev - parent lower bound: 900px;
					parent upper bound: 1024px; element lower bound: 90%; element upper bound: 40%; */
					{`
`}
					{`    `}&#125;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					Note the comment that accompanies <Code>calc()</Code> value. Preserving input values makes it easier to
					maintain the code.
				</p>
				<p className="vertical-spacing">
					The comment also includes <Code>https://responsify.dev</Code> both as a reference for future maintainers
					and as a unique string you can match against when tracking down responsified values.
				</p>
				{/* <!-- TODO: optimize screen reader usage --> */}
				<p className={`vertical-spacing ${classes.resize}`}></p>
				<p className="vertical-spacing">
					<em>Without</em> responsify:
				</p>
				<div className={`${classes.exampleDiv} vertical-spacing`}></div>
				<p className="vertical-spacing" id="description">
					<em>With</em> responsify:
				</p>
				<div
					className={`${classes.exampleDiv} vertical-spacing`}
					aria-live="polite"
					role="status"
					aria-describedby="description"
				></div>
			</Section>

			<Section className="vertical-spacing heading-container" heading={headings.h3_2}>
				<p className="vertical-spacing">
					You want the <Code>&lt;body&gt;</Code>&apos;s <Code>padding</Code> to increase from 10px to 50px, and
					have it stay at 50px once it hits the desktop breakpoint. For desktop and above you start off with:
				</p>
				<CodeBlock>
					body &#123;
					{`
`}
					{`    `}padding: 50px;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">and for below desktop you add:</p>
				<CodeBlock>
					@media (max-width: 1023px) &#123;
					{`
`}
					{`    `}body &#123;
					{`
`}
					{`        `}padding: calc(-8.182px + 5.682vw); /* https://responsify.dev - viewport lower bound: 320px;
					viewport upper bound: 1024px; element lower bound: 10px; element upper bound: 50px; */
					{`
`}
					{`    `}&#125;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					I&apos;m not a fan of using a <Code>max-width</Code> media query because it smells of a desktop-first
					approach 👎, but I&apos;ve included it here for completeness&apos; sake.
				</p>
			</Section>

			<Section className="vertical-spacing heading-container" heading={headings.h3_3}>
				<p className="vertical-spacing">
					You want the <Code>&lt;header&gt;</Code>&apos;s <Code>height</Code> to increase from 40px to 90px, and
					have it stay at 90px once it hits the desktop breakpoint.
				</p>
				<CodeBlock>
					header &#123;
					{`
`}
					{`    `}height: calc(17.273px + 7.102vw); /* https://responsify.dev - viewport lower bound: 320px;
					viewport upper bound: 1024px; element lower bound: 40px; element upper bound: 90px; */
					{`
    `}
					max-height: 90px;
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					Without the <Code>max-height</Code> the <Code>&lt;header&gt;</Code> would continue to grow in height with
					increase in viewport width. This approach removes the need for a media query 👍, but is limited to{' '}
					<Code>width</Code> and <Code>height</Code> as no other property has a corresponding{' '}
					<Code>max-width</Code> and <Code>max-height</Code>. 👎
				</p>
			</Section>

			<Section className="vertical-spacing heading-container" heading={headings.h3_4}>
				<p className="vertical-spacing">
					You want the <Code>&lt;button&gt;</Code>&apos;s <Code>border-width</Code> to increase from 1ch to 2ch,
					and have it stay at 2ch once it hits the desktop breakpoint. In this example let&apos;s say that the
					average character width is 13.65px.
				</p>
				<CodeBlock>
					button &#123;
					{`
`}
					{`    `}border-width: min(calc(0.545ch + 1.939vw), 2ch); /* https://responsify.dev - viewport lower
					bound: 320px; viewport upper bound: 1024px; element lower bound: 1ch; element upper bound: 2ch;
					&quot;ch&quot; width in pixels: 13.65; */
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					By using <Code>min()</Code> you can do away with media query <em>and</em> you&apos;re not limited to{' '}
					<Code>width</Code> and <Code>height</Code> like in <Link href={`#${headings.h3_3.id}`}>Example 3</Link>.
					💯
				</p>
			</Section>

			<Section className="vertical-spacing heading-container" heading={headings.h3_5}>
				<p className="vertical-spacing">
					You want the <Code>&lt;footer&gt;</Code>&apos;s <Code>margin-top</Code> to be 20px below tablet
					breakpoint, 200px above desktop breakpoint, and increase from 2.6vw at tablet breakpoint (0.026 * 768px ≅
					20px) to 19.5vw at desktop breakpoint (0.195 * 1024px ≅ 200px).
				</p>
				<CodeBlock>
					footer &#123;
					{`
`}
					{`    `}margin-top: clamp(20px, calc(-515.482px + 69.87vw), 200px); /* https://responsify.dev - viewport
					lower bound: 768px; viewport upper bound: 1024px; element lower bound: 2.75vw; element upper bound:
					19.53vw; */
					{`
`}
					&#125;
				</CodeBlock>
				<p className="vertical-spacing">
					Responsify + <Code>clamp()</Code> is a powerful combination 💪 that also allows you to do away with media
					queries and also allows you to mix and match units, something you can&apos;t do with responsify alone.
				</p>
			</Section>
		</Section>
	)
}
