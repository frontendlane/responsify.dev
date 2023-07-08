import type { HeadingElement } from '../Heading/Heading'
import { Link } from '../Link/Link'
import { Fragment } from 'preact'
import { Code } from '../Code/Code'
import { Section } from '../Section'

import classes from './TableOfContents.module.css'

export type HeadingShape = {
	id: string
	element: HeadingElement
	renderContent: () => any
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
		element: 'h1',
		renderContent: () => <Fragment>Responsify</Fragment>,
	},
	h2_1: {
		id: 'responsify',
		element: 'h2',
		renderContent: () => <Fragment>What is responsify?</Fragment>,
	},
	h2_2: {
		id: 'contents',
		element: 'h2',
		renderContent: () => <Fragment>Table of contents</Fragment>,
	},
	h2_3: {
		id: 'examples',
		element: 'h2',
		renderContent: () => <Fragment>How to responsify</Fragment>,
	},
	h3_1: {
		id: 'example-1',
		element: 'h3',
		renderContent: () => <Fragment>Example 1 featuring two media queries</Fragment>,
	},
	h3_2: {
		id: 'example-2',
		element: 'h3',
		renderContent: () => (
			<Fragment>
				Example 2 featuring <Code>max-width</Code> media query
			</Fragment>
		),
	},
	h3_3: {
		id: 'example-3',
		element: 'h3',
		renderContent: () => (
			<Fragment>
				Example 3 featuring <Code>max-height</Code>
			</Fragment>
		),
	},
	h3_4: {
		id: 'example-4',
		element: 'h3',
		renderContent: () => (
			<Fragment>
				Example 4 featuring <Code>ch</Code> and <Code>min()</Code>
			</Fragment>
		),
	},
	h3_5: {
		id: 'example-5',
		element: 'h3',
		renderContent: () => (
			<Fragment>
				Example 5 featuring <Code>clamp()</Code>
			</Fragment>
		),
	},
	h2_4: {
		id: 'form',
		element: 'h2',
		renderContent: () => (
			<Fragment>
				<b>Responsify form</b>
			</Fragment>
		),
	},
	h2_5: {
		id: 'sass-function',
		element: 'h2',
		renderContent: () => (
			<Fragment>
				Sass <Code>@function</Code>
			</Fragment>
		),
	},
	h2_6: {
		id: 'browser-support',
		element: 'h2',
		renderContent: () => <Fragment>Browser support</Fragment>,
	},
	h2_7: {
		id: 'comparison',
		element: 'h2',
		renderContent: () => <Fragment>Comparison with CSS locks</Fragment>,
	},
	h2_8: {
		id: 'resources',
		element: 'h2',
		renderContent: () => <Fragment>Related resources</Fragment>,
	},
	h2_9: {
		id: 'privacy',
		element: 'h2',
		renderContent: () => <Fragment>Privacy policy</Fragment>,
	},
	h2_10: {
		id: 'accessibility',
		element: 'h2',
		renderContent: () => <Fragment>Accessibility statement</Fragment>,
	},
}

export const TableOfContents = () => {
	return (
		<Section class="vertical-spacing-150-percent" heading={headings.h2_2}>
			<ol class={classes.ol}>
				<li class={classes.li}>
					<Link href={`#${headings.h1.id}`}>{headings.h1.renderContent()}</Link>
					<ol class={classes.ol}>
						<li class={classes.li}>
							<Link href={`#${headings.h2_1.id}`}>{headings.h2_1.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_2.id}`}>{headings.h2_2.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_3.id}`}>{headings.h2_3.renderContent()}</Link>
							<ol class={classes.ol}>
								<li class={classes.li}>
									<Link href={`#${headings.h3_1.id}`}>{headings.h3_1.renderContent()}</Link>
								</li>
								<li class={classes.li}>
									<Link href={`#${headings.h3_2.id}`}>{headings.h3_2.renderContent()}</Link>
								</li>
								<li class={classes.li}>
									<Link href={`#${headings.h3_3.id}`}>{headings.h3_3.renderContent()}</Link>
								</li>
								<li class={classes.li}>
									<Link href={`#${headings.h3_4.id}`}>{headings.h3_4.renderContent()}</Link>
								</li>
								<li class={classes.li}>
									<Link href={`#${headings.h3_5.id}`}>{headings.h3_5.renderContent()}</Link>
								</li>
							</ol>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_4.id}`}>{headings.h2_4.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_5.id}`}>{headings.h2_5.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_6.id}`}>{headings.h2_6.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_7.id}`}>{headings.h2_7.renderContent()}</Link>
						</li>
						<li class={classes.li}>
							<Link href={`#${headings.h2_8.id}`}>{headings.h2_8.renderContent()}</Link>
						</li>
					</ol>
				</li>
				<li class={classes.li}>
					<Link href={`#${headings.h2_9.id}`}>{headings.h2_9.renderContent()}</Link>
				</li>
				<li class={classes.li}>
					<Link href={`#${headings.h2_10.id}`}>{headings.h2_10.renderContent()}</Link>
				</li>
			</ol>
		</Section>
	)
}
