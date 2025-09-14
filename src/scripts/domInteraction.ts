import { isNullish } from '@/utils/isNullish'
import { objectEntries } from '@/utils/objectEntries'

export const removeContent = (element: Element | null) => {
	while (element?.firstChild) {
		element.removeChild(element.firstChild)
	}
}

type Content = string | Element | DocumentFragment

const setElementContent = (element: Element, content: Content | Array<Content>) => {
	removeContent(element)
	Array.isArray(content) ? element.append(...content) : element.append(content)
	return element
}

// TODO: add two TypeScript overrides
// TODO: test against other methods content setting methods for speed
export const setContent = (target: Element | Array<Element> | null, content?: Content | Array<Content>) => {
	if (!target) {
		throw new Error('No element to set content for')
	}
	if (isNullish(content)) {
		return target
	}
	return Array.isArray(target)
		? target.map((element) => setElementContent(element, content))
		: setElementContent(target, content)
}

type IAttributes = Record<string, string | number | boolean>

export const createElement = (elementName: string, attributes?: IAttributes, content?: Content) => {
	const element = window.document.createElement(elementName)
	attributes &&
		objectEntries(attributes).forEach(
			([attributeName, attributeValue]: [string, string | number | boolean]) =>
				void element.setAttribute(attributeName, String(attributeValue)),
		)
	return setContent(element, content)
}
