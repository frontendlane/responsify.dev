// TODO: if i want to use the syntax below I need to set allowSyntheticDefatulImports to true
// import ClipboardJS from 'clipboard';
// NOTE: upgrading to typescript 4 shows error when importing external dependencies even though it works
import ClipboardJS from 'clipboard'
import { StorageType } from '../../../scripts/types'
import { storage } from '../../../scripts/storage'
import { removeContent, setContent, createElement } from '../../../scripts/domInteraction'
import { setState, state } from '../../../scripts/state'
import { REM_SIZE_IN_PX } from '../../../scripts/constants'

const restoreState = () => {
	setState(Object.assign(state, { ...storage(StorageType.local)?.get() }, { ...storage(StorageType.session)?.get() }))
}

const setCssProperties = (cssProperty: string) => {
	setContent(
		Array.from(window.document.querySelectorAll('#css-property-1, #css-property-2, #css-property-3')),
		cssProperty
	)
}

const setUnits = () => {
	setContent(window.document.getElementById('unit-1'), state.unit)
	setContent(
		Array.from(window.document.querySelectorAll('#container-name-1, #container-name-2')),
		state.unit === '%' ? 'Parent' : 'Viewport'
	)
}

const renderChWidthInPx = () => {
	const chCode = createElement('code', { class: 'inline-code ' }, 'ch')
	// @ts-ignore
	const label = createElement('label', { class: 'label', for: 'ch-width-in-px' }, [chCode, ' width'])
	const input = createElement('input', {
		class: 'input',
		id: 'ch-width-in-px',
		type: 'number',
		step: '0.01',
		placeholder: '8.9',
		min: '0',
		required: 'required',
	})
	const pxCode = createElement('code', { class: 'inline-code' }, 'px')
	// @ts-ignore
	const flexWrapJoiner = createElement('div', { class: 'flex-wrap-joiner' }, [input, pxCode])
	// @ts-ignore
	const stepContainer = createElement('div', { class: 'step-container' }, [label, flexWrapJoiner])
	// @ts-ignore
	const li = createElement('li', { class: 'list-item', id: 'ch-width-container' }, stepContainer)
	// @ts-ignore
	window.document.getElementById('element-lower-bound-container')!.after(li)
}

const restoreDOM = () => {
	state.cssProperty && setCssProperties(state.cssProperty)
	state.unit && setUnits()
	if (state.unit === 'ch') {
		renderChWidthInPx()
	}
}

const restoreContent = () => {
	const cssProperty = window.document.getElementById('css-property') as HTMLInputElement
	if (cssProperty && state.cssProperty) cssProperty.value = state.cssProperty

	const elementLowerBound = window.document.getElementById('element-lower-bound') as HTMLInputElement
	if (elementLowerBound && state.elementLowerBound) elementLowerBound.valueAsNumber = state.elementLowerBound

	const unit = window.document.getElementById('unit') as HTMLSelectElement
	if (unit) unit.value = state.unit

	const chWidthInPx = window.document.getElementById('ch-width-in-px') as HTMLInputElement | null
	if (chWidthInPx && state.chWidthInPx) chWidthInPx.valueAsNumber = state.chWidthInPx

	const containerLowerBound = window.document.getElementById('container-lower-bound') as HTMLInputElement
	if (containerLowerBound && state.containerLowerBound) containerLowerBound.valueAsNumber = state.containerLowerBound

	const elementUpperBound = window.document.getElementById('element-upper-bound') as HTMLInputElement
	if (elementUpperBound && state.elementUpperBound) elementUpperBound.valueAsNumber = state.elementUpperBound

	const containerUpperBound = window.document.getElementById('container-upper-bound') as HTMLInputElement
	if (containerUpperBound && state.containerUpperBound) containerUpperBound.valueAsNumber = state.containerUpperBound
}

const restoreUsersPosition = () => {
	// TODO: instead of basing this on past usage, if the hash in the URL leads to the form then do this
	if (state.hasUsedForm) {
		window.setTimeout(() => {
			// setTimeout is needed for hard reload in Firefox, and either soft or hard reload in Chrome
			window.document.getElementById('css-property')!.focus()
			const formContainer = window.document.getElementById('form')!
			const emInPx = +window.getComputedStyle(formContainer).fontSize.trim().split('px')[0]!
			const verticalSpacing = +window
				.getComputedStyle(formContainer)
				.getPropertyValue('--vertical-spacing')
				.trim()
				.split('em')[0]!
			const outlineWidth = +window
				.getComputedStyle(formContainer)
				.getPropertyValue('--outline-width')
				.trim()
				.split('em')[0]!
			const scrollMarginBlockStart = +window
				.getComputedStyle(formContainer)
				.getPropertyValue('--scroll-margin-block-start')
				.trim()
				.split('em')[0]!
			const focusOffset = (verticalSpacing + outlineWidth + scrollMarginBlockStart) * emInPx
			window.scroll({ top: formContainer.getBoundingClientRect().top + window.scrollY - focusOffset }) // window.scrollY is needed because browsers try to restore scroll position from before soft reload
		}, 0)
	}
}

// when page loads restore state from localStorage
//     according to that state, fill out the form and put the UI in proper visual state
export const restoreFromStorage = () => {
	restoreState()
	restoreDOM()
	restoreContent()
	restoreUsersPosition()
}

const handlePropertyNameChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ cssProperty: target.value })
	setCssProperties(target.value)
}

// TODO: if user selects a value from one of the suggested items
const handlePropertyNameInput = () => {}

const handleElementLowerBoundChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ elementLowerBound: target.value })
}

const handleValueUnitChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ unit: target.value })
	setUnits()
	target.value === 'ch' ? renderChWidthInPx() : window.document.getElementById('ch-width-container')?.remove()
}

const handleChWidthChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ chWidthInPx: target.value })
}

const handleContainerLowerBoundChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ containerLowerBound: target.value })
}

const handleElementUpperBoundChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ elementUpperBound: target.value })
}

const handleContainerUpperBoundChange = (event: Event) => {
	const target = event.target as HTMLInputElement
	setState({ containerUpperBound: target.value })
}

const isValidNumber = (anything: any) => typeof anything === 'number' && !Number.isNaN(anything)

const getCalculationValues = () => {
	const elementLowerBound = (window.document.getElementById('element-lower-bound') as HTMLInputElement).valueAsNumber
	const chWidthInPx = (window.document.getElementById('ch-width-in-px') as HTMLInputElement | null)?.valueAsNumber
	const containerLowerBound = (window.document.getElementById('container-lower-bound') as HTMLInputElement).valueAsNumber
	const elementUpperBound = (window.document.getElementById('element-upper-bound') as HTMLInputElement).valueAsNumber
	const containerUpperBound = (window.document.getElementById('container-upper-bound') as HTMLInputElement).valueAsNumber

	// NOTE: TypeScript does not recognize that if any of these values is undefined that it will throw an error
	if (
		[elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound].some(
			(value) => !isValidNumber(value)
		)
	) {
		throw new Error(
			'Invalid number value for one (or more) of the following: element lower bound, container lower bound, element upper bound, container upper bound.'
		)
	}

	if (state.unit === 'ch' && !isValidNumber(chWidthInPx)) {
		throw new Error('Invalid number value for "ch" width ix pixels.')
	}

	setState({ elementLowerBound, chWidthInPx, containerLowerBound, elementUpperBound, containerUpperBound })

	return { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound, chWidthInPx }
}

const removeLastCharacter = (word: string) => word.substring(0, word.length - 1)

const trimUnnecessaryDigits = (number: number) => {
	let numberAsString = number.toFixed(3)
	while (numberAsString.endsWith('0')) {
		numberAsString = removeLastCharacter(numberAsString)
	}
	if (numberAsString.endsWith('.')) {
		numberAsString = removeLastCharacter(numberAsString)
	}
	return +numberAsString
}

const calculate = () => {
	const { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound, chWidthInPx } =
		getCalculationValues()

	let elementStartingSize
	switch (state.unit) {
		case 'px':
			elementStartingSize = elementLowerBound
			break
		case 'vw':
			elementStartingSize = (elementLowerBound / 100) * containerLowerBound
			break
		case '%':
			elementStartingSize = (elementLowerBound / 100) * containerLowerBound
			break
		case 'ch':
			elementStartingSize = elementLowerBound * (chWidthInPx as number)
			break
		case 'rem':
			elementStartingSize = elementLowerBound * REM_SIZE_IN_PX
			break
		default:
			throw new Error('Unsupported CSS unit.')
	}

	let elementEndingSize
	switch (state.unit) {
		case 'px':
			elementEndingSize = elementUpperBound
			break
		case 'vw':
			elementEndingSize = (elementUpperBound / 100) * containerUpperBound
			break
		case '%':
			elementEndingSize = (elementUpperBound / 100) * containerUpperBound
			break
		case 'ch':
			elementEndingSize = elementUpperBound * (chWidthInPx as number)
			break
		case 'rem':
			elementEndingSize = elementUpperBound * REM_SIZE_IN_PX
			break
		default:
			throw new Error('Unsupported CSS unit.')
	}

	const elementDiff = elementEndingSize - elementStartingSize
	const containerDiff = containerUpperBound - containerLowerBound
	const rate = elementDiff / containerDiff
	const initialInPx = elementStartingSize - containerLowerBound * rate

	let initial: number
	switch (state.unit) {
		case 'ch':
			initial = initialInPx / (chWidthInPx as number)
			break
		case 'rem':
			initial = initialInPx / REM_SIZE_IN_PX
			break
		default:
			initial = initialInPx
			break
	}

	return {
		containerLowerBound,
		containerUpperBound,
		elementLowerBound,
		elementUpperBound,
		initial,
		rate,
	}
}

const generate = () => {
	const { containerLowerBound, containerUpperBound, elementLowerBound, elementUpperBound, initial, rate } = calculate()

	const trimmedInitial = trimUnnecessaryDigits(initial)
	let initialUnit: string
	switch (state.unit) {
		case 'ch':
			initialUnit = state.unit
			break
		case 'rem':
			initialUnit = state.unit
			break
		default:
			initialUnit = 'px'
	}
	const sign = rate < 0 ? '-' : '+'
	const calcRate = trimUnnecessaryDigits(Math.abs(rate) * 100)
	const rateUnit = state.unit === '%' ? '%' : 'vw'

	return `${state.cssProperty}: calc(${trimmedInitial}${initialUnit} ${sign} ${calcRate}${rateUnit});${
		state.shouldIncludeComment
			? ` /* https://responsify.dev - ${
					state.unit === '%' ? 'parent' : 'viewport'
			  } lower bound: ${containerLowerBound}px; ${
					state.unit === '%' ? 'parent' : 'viewport'
			  } upper bound: ${containerUpperBound}px; element lower bound: ${elementLowerBound}${
					state.unit
			  }; element upper bound: ${elementUpperBound}${state.unit}; ${
					state.chWidthInPx ? `"ch" width in pixels: ${state.chWidthInPx}; ` : ''
			  }*/`
			: ''
	}`
}

const generateAndRender = (event: Event) => {
	event.preventDefault()

	const notification = createElement('span', { class: 'notification', id: 'notification' })
	const result = createElement('code', { class: 'block-code result' }, generate())
	// @ts-ignore
	const resultContainer = createElement('pre', { class: 'pre-block', id: 'result-container' }, result)
	// @ts-ignore
	setContent(window.document.getElementById('responsify-output'), [notification, resultContainer])
	window.document.getElementById('responsify-button')!.click()
	// @ts-ignore
	resultContainer.focus()
	setState({ hasUsedForm: true })
}

const handleReset = () => {
	storage(StorageType.session)?.clear()
}

const responsifyClipboardSuccess = () => {
	const notification = window.document.getElementById('notification')
	setContent(notification, 'Copied')
	window.setTimeout(() => removeContent(notification), 5000)
}

const responsifyClipboardError = () => {
	const notification = window.document.getElementById('notification')
	const kbd = window.document.createElement('kbd')
	kbd.className = 'kbd'
	// TODO: I need to programatically select the CSS declaration first (use Range API)
	// TODO: what about mobile users?? for them indicate that the text is selected?? (is it) and that they need to copy
	setContent(kbd, window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C')
	setContent(notification, ['Press ', kbd, ' to copy'])
	window.setTimeout(() => removeContent(notification), 5000)
}

const emailClipboardSuccess = () => {
	const emailNotification = window.document.getElementById('email-notification')
	setContent(emailNotification, 'Copied')
	window.getSelection()?.removeAllRanges()
	window.setTimeout(() => removeContent(emailNotification), 5000)
}

const emailClipboardError = () => {
	const emailNotification = window.document.getElementById('email-notification')
	const kbd = window.document.createElement('kbd')
	kbd.className = 'kbd'
	// TODO: what about mobile users?? for them indicate that the text is selected?? (is it) and that they need to copy
	setContent(kbd, window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C')
	setContent(emailNotification, ['Press ', kbd, ' to copy'])
	window.setTimeout(() => removeContent(emailNotification), 5000)
}

export const attachEventHandlers = () => {
	window.document.getElementById('css-property')!.addEventListener('change', handlePropertyNameChange)
	window.document.getElementById('css-property')!.addEventListener('input', handlePropertyNameInput)
	window.document.getElementById('element-lower-bound')!.addEventListener('change', handleElementLowerBoundChange)
	window.document.getElementById('unit')!.addEventListener('change', handleValueUnitChange)
	window.document.getElementById('ch-width-in-px')?.addEventListener('change', handleChWidthChange)
	window.document.getElementById('container-lower-bound')!.addEventListener('change', handleContainerLowerBoundChange)
	window.document.getElementById('element-upper-bound')!.addEventListener('change', handleElementUpperBoundChange)
	window.document.getElementById('container-upper-bound')!.addEventListener('change', handleContainerUpperBoundChange)
	window.document.getElementById('form-element')!.addEventListener('submit', generateAndRender)
	window.document.getElementById('form-element')!.addEventListener('reset', handleReset)

	const responsifyClipboard = new ClipboardJS('#responsify-button', { text: () => generate() })
	responsifyClipboard.on('success', responsifyClipboardSuccess)
	responsifyClipboard.on('error', responsifyClipboardError)

	const emailClipboard = new ClipboardJS('#email-button')
	emailClipboard.on('success', emailClipboardSuccess)
	emailClipboard.on('error', emailClipboardError)
}
