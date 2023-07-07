// TODO: if i want to use the syntax below I need to set allowSyntheticDefatulImports to true
// import ClipboardJS from 'clipboard';
// NOTE: upgrading to typescript 4 shows error when importing external dependencies even though it works
import ClipboardJS from 'clipboard'
import { StorageType } from '../../scripts/types'
import { storage } from '../../scripts/storage'
import { removeContent, setContent, createElement } from '../../scripts/domInteraction'
import { setState, state } from '../../scripts/state'

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
	const emailClipboard = new ClipboardJS('#email-button')
	emailClipboard.on('success', emailClipboardSuccess)
	emailClipboard.on('error', emailClipboardError)
}
