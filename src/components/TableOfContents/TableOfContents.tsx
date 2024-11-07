import type { HeadingLevel as HeadingLevel } from '../Heading/Heading'
import { Link } from '../Link/Link'
import { Fragment } from 'react'
import { Code } from '../Code/Code'
import { Section } from '../Section'

import classes from './TableOfContents.module.css'

export type HeadingShape = {
	id: string
	level: HeadingLevel
	content: React.ReactNode
}

type Headings = {
	h1: HeadingShape
	h2_1: HeadingShape
	h2_2: HeadingShape
	h2_3: HeadingShape
	h3_1: HeadingShape
	h3_2: HeadingShape
	h3_3: HeadingShape
	h3_4: HeadingShape
	h3_5: HeadingShape
	h2_4: HeadingShape
	h2_5: HeadingShape
	h2_6: HeadingShape
	h2_7: HeadingShape
	h2_8: HeadingShape
	h2_9: HeadingShape
	h2_10: HeadingShape
}

export const headings: Headings = {
	h1: {
		id: 'top',
		level: 'h1',
		content: 'Responsify',
	},
	h2_1: {
		id: 'responsify',
		level: 'h2',
		content: 'What is responsify?',
	},
	h2_2: {
		id: 'contents',
		level: 'h2',
		content: 'Table of contents',
	},
	h2_3: {
		id: 'examples',
		level: 'h2',
		content: 'How to responsify',
	},
	h3_1: {
		id: 'example-1',
		level: 'h3',
		content: 'Example 1 featuring two media queries',
	},
	h3_2: {
		id: 'example-2',
		level: 'h3',
		content: (
			<Fragment>
				Example 2 featuring <Code>max-width</Code> media query
			</Fragment>
		),
	},
	h3_3: {
		id: 'example-3',
		level: 'h3',
		content: (
			<Fragment>
				Example 3 featuring <Code>max-height</Code>
			</Fragment>
		),
	},
	h3_4: {
		id: 'example-4',
		level: 'h3',
		content: (
			<Fragment>
				Example 4 featuring <Code>ch</Code> and <Code>min()</Code>
			</Fragment>
		),
	},
	h3_5: {
		id: 'example-5',
		level: 'h3',
		content: (
			<Fragment>
				Example 5 featuring <Code>clamp()</Code>
			</Fragment>
		),
	},
	h2_4: {
		id: 'form',
		level: 'h2',
		content: (
			<Fragment>
				<b>Responsify form</b>
			</Fragment>
		),
	},
	h2_5: {
		id: 'sass-function',
		level: 'h2',
		content: (
			<Fragment>
				Sass <Code>@function</Code>
			</Fragment>
		),
	},
	h2_6: {
		id: 'browser-support',
		level: 'h2',
		content: 'Browser support',
	},
	h2_7: {
		id: 'comparison',
		level: 'h2',
		content: 'Comparison with CSS locks',
	},
	h2_8: {
		id: 'resources',
		level: 'h2',
		content: 'Related resources',
	},
	h2_9: {
		id: 'privacy',
		level: 'h2',
		content: 'Privacy policy',
	},
	h2_10: {
		id: 'accessibility',
		level: 'h2',
		content: 'Accessibility statement',
	},
}

export const TableOfContents = () => {
	return (
		<Section className="vertical-spacing-150-percent" heading={headings.h2_2}>
			<ol className={classes.ol}>
				<li className={classes.li}>
					<Link href={`#${headings.h1.id}`}>{headings.h1.content}</Link>
					<ol className={classes.ol}>
						<li className={classes.li}>
							<Link href={`#${headings.h2_1.id}`}>{headings.h2_1.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_2.id}`}>{headings.h2_2.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_3.id}`}>{headings.h2_3.content}</Link>
							<ol className={classes.ol}>
								<li className={classes.li}>
									<Link href={`#${headings.h3_1.id}`}>{headings.h3_1.content}</Link>
								</li>
								<li className={classes.li}>
									<Link href={`#${headings.h3_2.id}`}>{headings.h3_2.content}</Link>
								</li>
								<li className={classes.li}>
									<Link href={`#${headings.h3_3.id}`}>{headings.h3_3.content}</Link>
								</li>
								<li className={classes.li}>
									<Link href={`#${headings.h3_4.id}`}>{headings.h3_4.content}</Link>
								</li>
								<li className={classes.li}>
									<Link href={`#${headings.h3_5.id}`}>{headings.h3_5.content}</Link>
								</li>
							</ol>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_4.id}`}>{headings.h2_4.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_5.id}`}>{headings.h2_5.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_6.id}`}>{headings.h2_6.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_7.id}`}>{headings.h2_7.content}</Link>
						</li>
						<li className={classes.li}>
							<Link href={`#${headings.h2_8.id}`}>{headings.h2_8.content}</Link>
						</li>
					</ol>
				</li>
				<li className={classes.li}>
					<Link href={`#${headings.h2_9.id}`}>{headings.h2_9.content}</Link>
				</li>
				<li className={classes.li}>
					<Link href={`#${headings.h2_10.id}`}>{headings.h2_10.content}</Link>
				</li>
			</ol>
		</Section>
	)
}
