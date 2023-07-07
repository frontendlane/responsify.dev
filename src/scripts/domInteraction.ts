export const removeContent = (element: Element | null) => {
	while (element?.firstChild) {
		element.removeChild(element.firstChild)
	}
}

// TODO: find a better way to capture these types and just refer to them with a name or something
const setElementContent = (
	element: Element,
	content: string | Element | DocumentFragment | (string | Element | DocumentFragment)[]
) => {
	removeContent(element)
	Array.isArray(content) ? element?.append(...content) : element?.append(content)
	return element
}

// TODO: add two TypeScript overrides
export const setContent = (
	target: Element | Element[] | null,
	content?: string | Element | DocumentFragment | (string | Element | DocumentFragment)[]
) => {
	if (!target) {
		throw new Error('No element to set content for')
	}
	if (!content) {
		return target
	}
	return Array.isArray(target)
		? target.map((element) => setElementContent(element, content))
		: setElementContent(target, content)
}

interface IAttributes {
	[key: string]: string | number | boolean
}

export const createElement = (
	elementName: string,
	attributes?: IAttributes,
	content?: string | Element | DocumentFragment
) => {
	const element = window.document.createElement(elementName)
	attributes &&
		Object.entries(attributes).forEach(([attributeName, attributeValue]: [string, string | number | boolean]) =>
			element.setAttribute(attributeName, String(attributeValue))
		)
	return setContent(element, content)
}
