import { useEffect, useState } from 'preact/hooks'
import { Link } from '../Link/Link'
import { Section } from '../Section'
import { headings } from '../TableOfContents/TableOfContents'
import { Fragment, type FunctionalComponent } from 'preact'
import classes from './Footer.module.css'
import { assertUnreachable } from '../../utils/assertUnreachable'
import { Button } from '../../ui/Button'

type NotificationStatus = 'hidden' | 'success' | 'error'

export const Footer: FunctionalComponent = () => {
	const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('hidden')
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		setIsFirstRender(false)
	}, [])

	const renderNotification = () => {
		switch (notificationStatus) {
			case 'hidden':
				return
			case 'success':
				return 'Copied'
			case 'error':
				// TODO: verify that all platforms support this way of copying to clipboard. still customize the error message copy
				return (
					<Fragment>
						Press{' '}
						<kbd class={classes.kbd}>
							{/* TODO: if it fails then CMD + C / Control + C won't do anything... */}
							{window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C'}
						</kbd>{' '}
						to copy
					</Fragment>
				)
			default:
				return assertUnreachable(notificationStatus)
		}
	}

	const clipboardSuccess = () => {
		setNotificationStatus('success')
		window.setTimeout(() => setNotificationStatus('hidden'), 5000)
	}

	const clipboardError = () => {
		setNotificationStatus('error')
		window.setTimeout(() => setNotificationStatus('hidden'), 5000)
	}

	const a11yEmailAddress = 'a11y@responsify.dev'

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
					<Link href={`mailto:${a11yEmailAddress}`}>{a11yEmailAddress}</Link>.
				</p>
				<div class={classes.emailDispenser}>
					<div class={classes.emailEnclosure}>
						<output class={classes.emailNotification} id="email-notification" aria-live="polite" role="status">
							{renderNotification()}
						</output>
						<Button
							disabled={isFirstRender}
							onClick={() =>
								navigator.clipboard.writeText(a11yEmailAddress).then(clipboardSuccess, clipboardError)
							}
						>
							Copy email address
						</Button>
					</div>
				</div>
			</Section>
		</footer>
	)
}
