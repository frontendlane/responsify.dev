'use client'

import { Fragment, type FunctionComponent } from 'react'
import { headings } from '../TableOfContents/TableOfContents'
import { Code } from '../Code/Code'
import { DataList } from '../DataList'
import { Section } from '../Section'
import styles from './Form.module.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CodeBlock } from '../CodeBlock/CodeBlock'
import { generateCss } from './generate'
import { assertUnreachable } from '../../utils/assertUnreachable'
import { Link } from '../Link/Link'
import { Button } from '../../ui/Button'

const longTaskDurationAsDefinedByGoogleWebVitals = 50

const formSchema = z.object({
	cssProperty: z.string(),
	elementLowerBound: z.coerce.number(),
	unit: z.union([z.literal('px'), z.literal('vw'), z.literal('%'), z.literal('ch'), z.literal('rem')]),
	chWidthInPx: z.optional(z.coerce.number()),
	containerLowerBound: z.coerce.number(),
	elementUpperBound: z.coerce.number(),
	containerUpperBound: z.coerce.number(),
})

export type FormValues = z.infer<typeof formSchema>
type NotificationStatus = 'hidden' | 'success' | 'error'

export const Form: FunctionComponent = () => {
	const resultContainer = useRef<HTMLPreElement>(null)
	const [windowError, setWindowError] = useState('')
	const [isFirstRender, setIsFirstRender] = useState(true)
	const [notificationStatus, setNotificationStatus] = useState<NotificationStatus>('hidden')
	const {
		reset,
		watch,
		getValues,
		register,
		handleSubmit,
		formState: { isSubmitted, isDirty },
	} = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		// TODO: defaultValues pros and cons
		// TODO: on page reload some inputs preserve value and others don't... why?
		//  TODO: well, default values fix this ^ issue, won't they??
		defaultValues: {
			elementLowerBound: NaN,
			containerLowerBound: NaN,
			containerUpperBound: NaN,
		},
	})

	const cssProperty = watch('cssProperty') || '<css-property>'
	const unit = watch('unit') || 'px'
	const container = unit === '%' ? 'Parent' : 'Viewport'

	const clipboardSuccess = () => {
		setNotificationStatus('success')
		window.setTimeout(() => setNotificationStatus('hidden'), 5000)
	}

	const clipboardError = () => {
		setNotificationStatus('error')
		window.setTimeout(() => setNotificationStatus('hidden'), 5000)
	}

	const focusResult = (interval: number) => {
		if (resultContainer.current) {
			resultContainer.current.focus()
			window.clearInterval(interval)
		}
	}

	const onSubmit = (values: FormValues) => {
		const interval = window.setInterval(() => focusResult(interval), 0)
		window.setTimeout(() => window.clearInterval(interval), longTaskDurationAsDefinedByGoogleWebVitals)
		navigator.clipboard.writeText(generateCss(values)).then(clipboardSuccess, clipboardError)
	}

	useEffect(() => {
		setIsFirstRender(false)
		window.addEventListener('error', (error) => setWindowError(error.message))
	}, [])

	// https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-1/
	// https://www.sarasoueidan.com/blog/accessible-notifications-with-aria-live-regions-part-2/
	const renderNotification = () => {
		switch (notificationStatus) {
			case 'hidden':
				return
			case 'success':
				return <span className={styles.notification}>Copied</span>
			case 'error':
				return (
					// TODO: verify that all platforms support this way of copying to clipboard. still customize the error message copy
					<span className={styles.notification}>
						Press{' '}
						<kbd className={styles.kbd}>
							{/* TODO: if it fails then CMD + C / Control + C won't do anything... */}
							{window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C'}
						</kbd>{' '}
						to copy
					</span>
				)
			default:
				return assertUnreachable(notificationStatus)
		}
	}

	const isDisabled = useMemo(() => isFirstRender || !!windowError, [isFirstRender, windowError])

	const dataListId = 'css-properties'

	const contactEmailAddress = 'petar@responsify.dev'

	return (
		<Section className={styles.formContainer} heading={headings.h2_4}>
			<div className={styles.jsError} hidden={!windowError}>
				<p>
					{windowError ? (
						<Fragment>
							JavaScript failed to execute with the following error message: <Code>{windowError}</Code>
						</Fragment>
					) : (
						'JavaScript failed to execute.'
					)}{' '}
					😵 You won&apos;t be able to generate a <Code>calc()</Code> value.
				</p>
				<p className="vertical-spacing">
					You might be able to resolve the issue by reloading the page. If that {"doesn't"} work, update your
					browser to the latest version and try again. If that {"doesn't"} work please email me at{' '}
					<Link href={`mailto:${contactEmailAddress}`}>{contactEmailAddress}</Link>.
				</p>
				<p className="vertical-spacing"> Error stack is logged to the console.</p>
			</div>
			<p className="vertical-spacing">
				Generate responsified <Code>calc()</Code> value using the form below.
			</p>
			<p className="vertical-spacing">
				Bookmark the link next to the form heading above for direct access to this form.
			</p>
			<form className='form-element"' aria-labelledby={headings.h2_4.id} onSubmit={handleSubmit(onSubmit)}>
				<noscript className={styles.noscript}>
					<p>
						<strong>
							JavaScript needs to be enabled in order to generate a<Code>calc()</Code>
							value.
						</strong>
					</p>
				</noscript>
				<ol className={styles.list}>
					<li className={styles.listItem}>
						<div className={styles.stepContainer}>
							<label className={styles.label} htmlFor="css-property">
								CSS property
							</label>
							<input
								className={`${styles.input} ${styles.cssProperty}`}
								{...register('cssProperty')}
								id="css-property"
								disabled={isDisabled}
								list={dataListId}
								type="text"
								placeholder="width"
								required
							/>
							<DataList id={dataListId} />
						</div>
					</li>

					<li className={styles.listItem}>
						<div className={styles.stepContainer}>
							<label className={styles.label} htmlFor="element-lower-bound">
								<Code>{cssProperty}</Code> at lower bound
							</label>
							<div className={styles.flexWrapJoiner}>
								<input
									className={styles.input}
									{...register('elementLowerBound')}
									id="element-lower-bound"
									disabled={isDisabled}
									type="number"
									step="0.01"
									placeholder="25"
									required
								/>
								<label className="visually-hidden" htmlFor="unit">
									<Code>{cssProperty}</Code> unit
								</label>
								{/* <!-- TODO: height of the select should be the parent height. enhance with js --> */}
								<select
									className={styles.select}
									id="unit"
									disabled={isDisabled}
									defaultValue="px"
									required
									{...register('unit')}
								>
									<option value="px">px</option>
									<option value="vw">vw</option>
									<option value="%">%</option>
									<option value="ch">ch</option>
									<option value="rem">rem</option>
								</select>
							</div>
						</div>
					</li>

					{unit === 'ch' && (
						<li className={styles.listItem}>
							<div className={styles.stepContainer}>
								<label className={styles.label} htmlFor="ch-width-in-px">
									<Code>ch</Code> width
								</label>
								<div className={styles.flexWrapJoiner}>
									<input
										className={styles.input}
										{...register('chWidthInPx')}
										id="ch-width-in-px"
										type="number"
										step="0.01"
										placeholder="8.9"
										min="0"
										required
									/>
									<Code>px</Code>
								</div>
							</div>
						</li>
					)}

					<li className={styles.listItem}>
						<div className={styles.stepContainer}>
							<label className={styles.label} htmlFor="container-lower-bound">
								{container} lower bound
							</label>
							<div className={styles.flexWrapJoiner}>
								<input
									className={styles.input}
									{...register('containerLowerBound')}
									id="container-lower-bound"
									disabled={isDisabled}
									type="number"
									step="0.01"
									placeholder="320"
									min="0"
									required
								/>
								<Code>px</Code>
							</div>
						</div>
					</li>

					<li className={styles.listItem}>
						<div className={styles.stepContainer}>
							<label className={styles.label} htmlFor="element-upper-bound">
								<Code>{cssProperty}</Code> at upper bound
							</label>
							<div className={styles.flexWrapJoiner}>
								<input
									className={styles.input}
									{...register('elementUpperBound')}
									id="element-upper-bound"
									disabled={isDisabled}
									type="number"
									step="0.01"
									placeholder="80"
									required
								/>
								<Code>{unit}</Code>
							</div>
						</div>
					</li>

					<li className={styles.listItem}>
						<div className={styles.stepContainer}>
							<label className={styles.label} htmlFor="container-upper-bound">
								{container} upper bound
							</label>
							<div className={styles.flexWrapJoiner}>
								<input
									className={styles.input}
									{...register('containerUpperBound')}
									id="container-upper-bound"
									disabled={isDisabled}
									type="number"
									step="0.01"
									placeholder="1440"
									min="0"
									required
								/>
								<Code>px</Code>
							</div>
						</div>
					</li>
				</ol>
				<Button type="submit" disabled={isDisabled}>
					Generate and copy to clipboard
				</Button>
				<Button type="reset" disabled={isDisabled} onClick={() => reset()}>
					Reset
				</Button>
				<output className={styles.output} aria-live="assertive" role="alert">
					{isSubmitted && isDirty && (
						<Fragment>
							{renderNotification()}
							<CodeBlock ref={resultContainer} className={styles.result}>
								{generateCss(getValues())}
							</CodeBlock>
						</Fragment>
					)}
				</output>
			</form>
		</Section>
	)
}
