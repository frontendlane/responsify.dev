import { Link } from '../Link/Link'
import { Section } from '../Section'
import { headings } from '../TableOfContents/TableOfContents'

import classes from './Footer.module.css'
import type { FunctionalComponent } from 'preact'

export const Footer: FunctionalComponent = () => {
	return (
		<footer class={`${classes.footer} vertical-spacing-150-percent`}>
			<Section class="vertical-spacing-150-percent" heading={headings.h2_9}>
				<p class="vertical-spacing">
					There is none because no data is collected. No ads 📢, no analytics 📊, no tracking 🕵️, no telemetry 📡,
					no cookies 🍪, no bullshit 🐂💩.
				</p>
			</Section>
			<Section class="vertical-spacing-150-percent" heading={headings.h2_10}>
				<p class="vertical-spacing">
					I try hard to make my work accessible. ♿️ If something isn't working for you please email me at{' '}
					<Link href="mailto:a11y@responsify.dev" id="email">
						a11y@responsify.dev
					</Link>
					.
				</p>
				<div class={classes.emailDispenser}>
					<div class={classes.emailEnclosure}>
						<output
							class={classes.emailNotification}
							id="email-notification"
							aria-live="polite"
							role="status"
						></output>
						<button class="button" id="email-button" data-clipboard-target="#email" disabled>
							Copy email address
						</button>
					</div>
				</div>
			</Section>
		</footer>
	)
}