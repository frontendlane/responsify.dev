import { Fragment, type FunctionComponent } from 'preact'
import { headings } from '../TableOfContents/TableOfContents'
import { Code } from '../Code/Code'
import { DataList } from '../DataList'
import { Section } from '../Section'
import classes from './Form.module.css'
import { useEffect, useMemo, useRef, useState } from 'preact/hooks'
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

	const renderNotification = () => {
		switch (notificationStatus) {
			case 'hidden':
				return
			case 'success':
				return <span class={classes.notification}>Copied</span>
			case 'error':
				return (
					// TODO: verify that all platforms support this way of copying to clipboard. still customize the error message copy
					<span class={classes.notification}>
						Press{' '}
						<kbd class={classes.kbd}>
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
		<Section class={classes.formContainer} heading={headings.h2_4}>
			<div class={classes.jsError} hidden={!windowError}>
				<p>
					{windowError ? (
						<Fragment>
							JavaScript failed to execute with the following error message: <Code>{windowError}</Code>
						</Fragment>
					) : (
						'JavaScript failed to execute.'
					)}{' '}
					😵 You won't be able to generate a <Code>calc()</Code> value.
				</p>
				<p class="vertical-spacing">
					You might be able to resolve the issue by reloading the page. If that doesn't work, update your browser
					to the latest version and try again. If that doesn't work please email me at{' '}
					<Link href={`mailto:${contactEmailAddress}`}>{contactEmailAddress}</Link>.
				</p>
				<p class="vertical-spacing"> Error stack is logged to the console.</p>
			</div>
			<p class="vertical-spacing">
				Generate responsified <Code>calc()</Code> value using the form below.
			</p>
			<p class="vertical-spacing">Bookmark the link next to the form heading above for direct access to this form.</p>
			<form class='form-element"' aria-labelledby={headings.h2_4.id} onSubmit={handleSubmit(onSubmit)}>
				<noscript class={classes.noscript}>
					<p>
						<strong>
							JavaScript needs to be enabled in order to generate a<Code>calc()</Code>
							value.
						</strong>
					</p>
				</noscript>
				<ol class={classes.list}>
					<li class={classes.listItem}>
						<div class={classes.stepContainer}>
							<label class={classes.label} for="css-property">
								CSS property
							</label>
							<input
								class={`${classes.input} ${classes.cssProperty}`}
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

					<li class={classes.listItem}>
						<div class={classes.stepContainer}>
							<label class={classes.label} for="element-lower-bound">
								<Code>{cssProperty}</Code> at lower bound
							</label>
							<div class={classes.flexWrapJoiner}>
								<input
									class={classes.input}
									{...register('elementLowerBound')}
									id="element-lower-bound"
									disabled={isDisabled}
									type="number"
									step="0.01"
									placeholder="25"
									required
								/>
								<label class="visually-hidden" for="unit">
									<Code>{cssProperty}</Code> unit
								</label>
								{/* <!-- TODO: height of the select should be the parent height. enhance with js --> */}
								<select
									class={classes.select}
									id="unit"
									disabled={isDisabled}
									required
									{...register('unit')}
								>
									<option value="px" selected>
										px
									</option>
									<option value="vw">vw</option>
									<option value="%">%</option>
									<option value="ch">ch</option>
									<option value="rem">rem</option>
								</select>
							</div>
						</div>
					</li>

					{unit === 'ch' && (
						<li class={classes.listItem}>
							<div class={classes.stepContainer}>
								<label class={classes.label} for="ch-width-in-px">
									<Code>ch</Code> width
								</label>
								<div class={classes.flexWrapJoiner}>
									<input
										class={classes.input}
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

					<li class={classes.listItem}>
						<div class={classes.stepContainer}>
							<label class={classes.label} for="container-lower-bound">
								{container} lower bound
							</label>
							<div class={classes.flexWrapJoiner}>
								<input
									class={classes.input}
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

					<li class={classes.listItem}>
						<div class={classes.stepContainer}>
							<label class={classes.label} for="element-upper-bound">
								<Code>{cssProperty}</Code> at upper bound
							</label>
							<div class={classes.flexWrapJoiner}>
								<input
									class={classes.input}
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

					<li class={classes.listItem}>
						<div class={classes.stepContainer}>
							<label class={classes.label} for="container-upper-bound">
								{container} upper bound
							</label>
							<div class={classes.flexWrapJoiner}>
								<input
									class={classes.input}
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
				<output class={classes.output} aria-live="assertive" role="alert">
					{isSubmitted && isDirty && (
						<Fragment>
							{renderNotification()}
							<CodeBlock ref={resultContainer} class={classes.result}>
								{generateCss(getValues())}
							</CodeBlock>
						</Fragment>
					)}
				</output>
			</form>
		</Section>
	)
}
