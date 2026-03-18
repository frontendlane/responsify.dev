'use client'

import { useEffect, useState } from 'react'
import { Link } from '../Link/Link'
import { Section } from '../Section'
import { headings } from '../TableOfContents/TableOfContents'
import styles from './Footer.module.css'
import { assertUnreachable } from '../../utils/assertUnreachable'
import { Button } from '../../ui/Button'
import { clipboardTimeout } from '../../utils/constants'

type NotificationStatus = 'hidden' | 'success' | 'error'

export const Footer = () => {
	const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('hidden')
	const [isFirstRender, setIsFirstRender] = useState(true)

	useEffect(() => {
		setIsFirstRender(false)
	}, [])

	const renderNotification = () => {
		switch (notificationStatus) {
			case 'hidden':
				return null
			case 'success':
				return 'Copied'
			case 'error':
				// TODO: verify that all platforms support this way of copying to clipboard. still customize the error message copy
				return (
					<>
						Press{' '}
						<kbd className={styles.kbd}>
							{/* TODO: if it fails then CMD + C / Control + C won't do anything... */}
							{window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C'}
						</kbd>{' '}
						to copy
					</>
				)
			default:
				return assertUnreachable(notificationStatus)
		}
	}

	const clipboardSuccess = () => {
		setNotificationStatus('success')
		window.setTimeout(() => setNotificationStatus('hidden'), clipboardTimeout)
	}

	const clipboardError = () => {
		setNotificationStatus('error')
		window.setTimeout(() => setNotificationStatus('hidden'), clipboardTimeout)
	}

	const a11yEmailAddress = 'a11y@responsify.dev'

	return (
		<footer className={`${styles.footer} verticalSpacing150Percent`}>
			<Section className="verticalSpacing150Percent" heading={headings.h2_9}>
				<p className="verticalSpacing">
					There is none because no data is collected. No ads 📢, no analytics 📊, no tracking 🕵️, no telemetry 📡,
					no cookies 🍪, no bullshit 🐂💩.
				</p>
			</Section>
			<Section className="verticalSpacing150Percent" heading={headings.h2_10}>
				<p className="verticalSpacing">
					I try hard to make my work accessible. ♿️ If something isn&apos;t working for you please email me at{' '}
					<Link href={`mailto:${a11yEmailAddress}`}>{a11yEmailAddress}</Link>.
				</p>
				<div className={styles.emailDispenser}>
					<div className={styles.emailEnclosure}>
						{/* TODO: I *think* I read there's a reason to actually keep role="status" even on elements that implicitly have this role, investigate */}
						{/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
						<output
							className={styles.emailNotification}
							id="email-notification"
							aria-live="polite"
							role="status"
						>
							{renderNotification()}
						</output>
						<Button
							type="button"
							disabled={isFirstRender}
							onClick={() =>
								window.navigator.clipboard.writeText(a11yEmailAddress).then(clipboardSuccess, clipboardError)
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
