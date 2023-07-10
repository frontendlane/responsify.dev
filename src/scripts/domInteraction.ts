export const removeContent = (element: Element | null) => {
	while (element?.firstChild) {
		element.removeChild(element.firstChild)
	}
}

type Content = string | Element | DocumentFragment

const setElementContent = (element: Element, content: Content | Content[]) => {
	removeContent(element)
	Array.isArray(content) ? element?.append(...content) : element?.append(content)
	return element
}

// TODO: add two TypeScript overrides
// TODO: test against other methods content setting methods for speed
export const setContent = (target: Element | Element[] | null, content?: Content | Content[]) => {
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

export const createElement = (elementName: string, attributes?: IAttributes, content?: Content) => {
	const element = window.document.createElement(elementName)
	attributes &&
		Object.entries(attributes).forEach(([attributeName, attributeValue]: [string, string | number | boolean]) =>
			element.setAttribute(attributeName, String(attributeValue))
		)
	return setContent(element, content)
}
