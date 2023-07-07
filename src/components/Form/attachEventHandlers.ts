import ClipboardJS from 'clipboard'
import { removeContent, setContent } from '../../scripts/domInteraction'

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
