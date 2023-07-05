import type { FunctionComponent } from 'preact'
import { headings } from '../TableOfContents/TableOfContents'
import { Code } from '../Code/Code'
import { DataList } from '../DataList'
import { Section } from '../Section'
import classes from './Form.module.css'
import { useEffect } from 'preact/hooks'
import { setContent, createElement } from '../../scripts/domInteraction'
import { attachEventHandlers } from './attachEventHandlers'
import { enableFormControls } from './enableFormControls'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const formSchema = z.object({
	'css-property': z.string(),
	'element-lower-bound': z.coerce.number(),
	unit: z.union([z.literal('px'), z.literal('vw'), z.literal('%'), z.literal('ch'), z.literal('rem')]),
	'container-lower-bound': z.coerce.number(),
	'element-upper-bound': z.coerce.number(),
	'container-upper-bound': z.coerce.number(),
})

type Form = z.infer<typeof formSchema>

export const Form: FunctionComponent = () => {
	const { watch, register, handleSubmit } = useForm<Form>({
		resolver: zodResolver(formSchema),
		// TODO: defaultValues pros and cons
	})

	const cssProperty = watch('css-property') || '<css-property>'

	const { onChange, ...cssPropertyAttributes } = register('css-property')

	const customOnChange = (event: Event) => {
		onChange(event)
	}

	const onSubmit = (values: any) => {
		console.log({ values })
	}

	useEffect(() => {
		window.addEventListener('error', (error) => {
			// TODO: should I wrap all of this code in a try catch block so as to prevent an infinite call stack??
			window.document.head.append(
				// @ts-ignore
				createElement(
					'style',
					{},
					`.form :where(.a, .label, .input, .select, .button, .output) {pointer-events: revert;}`
				)
			)
			const jsErrorElement = window.document.getElementById('js-error')
			jsErrorElement && jsErrorElement.removeAttribute('hidden')
			// TODO: put back disabled attributes
			const errorMessage = createElement('code', { class: 'inline-code' }, error.message) as Element
			setContent(window.document.getElementById('js-error-intro'), [
				'JavaScript failed to execute with the following error message: ',
				errorMessage,
			])
		})

		attachEventHandlers()
		enableFormControls()
	}, [])

	return (
		<div class={classes.form} id="form">
			{/* <pre>{JSON.stringify(watch())}</pre> */}
			<Section class="vertical-spacing-150-percent" heading={headings.h2_4}>
				<div class={classes.jsError} id="js-error" hidden>
					<p>
						<span id="js-error-intro">JavaScript failed to execute.</span>
						😵 You won't be able to generate a <Code>calc()</Code> value.
					</p>
					<p class="vertical-spacing">
						You might be able to resolve the issue by reloading the page. If that doesn't work, update your
						browser to the latest version and try again.
					</p>
					<p class="vertical-spacing"> Error stack is logged to the console.</p>
				</div>
				<p class="vertical-spacing">
					Generate responsified <Code>calc()</Code> value using the form below.
				</p>
				<p class="vertical-spacing">
					Bookmark the link next to the form heading above for direct access to this form.
				</p>
				<form
					class='form-element"'
					id="form-element"
					aria-labelledby={headings.h2_4.id}
					onSubmit={handleSubmit(onSubmit)}
				>
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
									onChange={customOnChange}
									{...cssPropertyAttributes}
									id="css-property"
									disabled
									list="css-properties"
									type="text"
									placeholder="width"
									required
								/>
								<DataList />
							</div>
						</li>

						<li class={classes.listItem} id="element-lower-bound-container">
							<div class={classes.stepContainer}>
								<label class={classes.label} for="element-lower-bound">
									<Code id="css-property-1">{cssProperty}</Code> at lower bound
								</label>
								<div class={classes.flexWrapJoiner}>
									<input
										class={classes.input}
										{...register('element-lower-bound')}
										id="element-lower-bound"
										disabled
										type="number"
										step="0.01"
										placeholder="25"
										required
									/>
									<label class="visually-hidden" for="unit">
										<Code id="css-property-2">{cssProperty}</Code> unit
									</label>
									{/* <!-- TODO: height of the select should be the parent height. enhance with js --> */}
									<select class={classes.select} id="unit" disabled required {...register('unit')}>
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

						<li class={classes.listItem}>
							<div class={classes.stepContainer}>
								<label class={classes.label} for="container-lower-bound">
									<span id="container-name-1">Viewport</span> lower bound
								</label>
								<div class={classes.flexWrapJoiner}>
									<input
										class={classes.input}
										{...register('container-lower-bound')}
										id="container-lower-bound"
										disabled
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
									<Code id="css-property-3">{cssProperty}</Code> at upper bound
								</label>
								<div class={classes.flexWrapJoiner}>
									<input
										class={classes.input}
										{...register('element-upper-bound')}
										id="element-upper-bound"
										disabled
										type="number"
										step="0.01"
										placeholder="80"
										required
									/>
									<Code id="unit-1">px</Code>
								</div>
							</div>
						</li>

						<li class={classes.listItem}>
							<div class={classes.stepContainer}>
								<label class={classes.label} for="container-upper-bound">
									<span id="container-name-2">Viewport</span> upper bound
								</label>
								<div class={classes.flexWrapJoiner}>
									<input
										class={classes.input}
										{...register('container-upper-bound')}
										id="container-upper-bound"
										disabled
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
					<button class={classes.button} type="submit" disabled>
						Generate and copy to clipboard
					</button>
					<button hidden id="responsify-button" type="button"></button>
					{/* <!-- TODO: reset button doesn't reset the form to its pristine state --> */}
					<button class={classes.button} type="reset" disabled>
						Reset
					</button>
					<output class={classes.output} id="responsify-output" aria-live="assertive" role="alert"></output>
				</form>
			</Section>
		</div>
	)
}
