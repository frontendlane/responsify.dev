/* eslint-disable */ // TODO: enable eslint
// https://codepen.io/argyleink/pen/dyQxmYK
import { half } from '../utils/constants'
import { isNullish } from '../utils/isNullish'
import { objectEntries } from '../utils/objectEntries'
import { WHITE_SPACE, NON_BREAKING_SPACE } from './constants'
import { setContent, removeContent } from './domInteraction'

type ITags = Record<number, string>

type IOptions = {
	// get rid of the resize boolean option and just use the resizeThrottleDelay
	resize?: boolean
	resizeThrottleDelay?: number
	onUnorphan?: () => void
	force?: boolean
}

const isLastSpaceRegularWhiteSpace = (text: string) => text.lastIndexOf(WHITE_SPACE) > text.lastIndexOf(NON_BREAKING_SPACE)

const isUnorphanable = (text: string) => {
	const deserializedText = text.split('')
	const secondToLastOffset = 2
	const plusOneOffset = 1
	const plusTwoOffset = 2
	for (let characterIndex = 0; characterIndex < deserializedText.length - secondToLastOffset; characterIndex++) {
		if (
			deserializedText[characterIndex] !== WHITE_SPACE &&
			deserializedText[characterIndex + plusOneOffset] === WHITE_SPACE &&
			deserializedText[characterIndex + plusTwoOffset] !== WHITE_SPACE
		) {
			return true
		}
	}
	return false
}

const normalizeTabsAndWhiteSpaces = (html: string) => {
	let normalizedHtml = html
	normalizedHtml = normalizedHtml.replaceAll(/\n(?:\t)*/g, WHITE_SPACE)
	if (normalizedHtml.endsWith(WHITE_SPACE)) {
		normalizedHtml = normalizedHtml.substring(0, normalizedHtml.length - 1)
	}
	// TODO: this doesn't handle if spaces are used for indenting instead of tabs
	return normalizedHtml
}

const extractTags = (html: string) => {
	let newHtml = html
	newHtml = normalizeTabsAndWhiteSpaces(newHtml)

	let textContent = newHtml
	const tags: ITags = {}
	for (let characterIndex = 0; characterIndex < newHtml.length; characterIndex++) {
		if (newHtml[characterIndex] === '<') {
			const openingBracketIndex = characterIndex
			let closingBracketIndex: number | undefined
			for (let j = openingBracketIndex; j < newHtml.length; j++) {
				if (newHtml[j] === '>') {
					closingBracketIndex = j + 1
					break
				}
			}
			if (isNullish(closingBracketIndex)) {
				throw new Error('Malformed HTML.')
			}
			tags[openingBracketIndex] = newHtml.substring(openingBracketIndex, closingBracketIndex)
		}
	}

	objectEntries(tags)
		.toReversed()
		.forEach(([openingBracketIndex, tag]) => {
			textContent = `${textContent.slice(0, +openingBracketIndex)}${textContent.slice(
				+openingBracketIndex + tag.length,
			)}`
		})

	return { textContent, tags }
}

const depositTags = (unorphanedTextContent: string, tags: ITags) => {
	let innerHTML = unorphanedTextContent
	objectEntries(tags).forEach(([openingBracketIndex, text]) => {
		innerHTML = `${innerHTML.slice(0, +openingBracketIndex)}${text}${innerHTML.slice(+openingBracketIndex)}`
	})
	return innerHTML
}

const unorphanChildrenfullHTML = (element: Element) => {
	const { textContent, tags } = extractTags(element.innerHTML)

	const deserializedTextContent = textContent.split('')
	let unorphanedTextContent
	const minusOneOffset = 1
	const minusTwoOffset = 2
	for (let characterIndex = deserializedTextContent.length - 1; characterIndex >= 0; characterIndex--) {
		if (
			deserializedTextContent[characterIndex] !== WHITE_SPACE &&
			deserializedTextContent[characterIndex - minusOneOffset] === WHITE_SPACE &&
			deserializedTextContent[characterIndex - minusTwoOffset] !== WHITE_SPACE
		) {
			unorphanedTextContent = `${textContent.substring(0, characterIndex - 1)}${NON_BREAKING_SPACE}${textContent.substring(characterIndex)}`
			break
		}
	}

	if (isNullish(unorphanedTextContent)) {
		throw new Error('Could not find where to replace regular white space with non-breaking space.')
	}

	return {
		unorphanedTextContent,
		unorphanedInnerHTML: depositTags(unorphanedTextContent, tags),
	}
}

const unorphanChildrenlessHTML = (element: Element) => {
	const textContent = element.textContent as string
	const lastWhiteSpacePosition = textContent.lastIndexOf(WHITE_SPACE)
	const unorphanedTextContent = `${textContent.substring(
		0,
		lastWhiteSpacePosition,
	)}${NON_BREAKING_SPACE}${textContent.substring(lastWhiteSpacePosition + 1)}`

	return {
		unorphanedTextContent,
		unorphanedInnerHTML: unorphanedTextContent,
	}
}

const getWords = (unorphanedTextContent: string) => {
	const deserializedTextContent = unorphanedTextContent.trim().split(WHITE_SPACE)
	// TODO: why is ?? necessary??
	const unorphanedWords = deserializedTextContent.pop() ?? ''
	const otherWords = deserializedTextContent.join(WHITE_SPACE)
	return { unorphanedWords, otherWords }
}

const areUnorphanedWordsShorterThanHalfParentContentWidth = (element: Element, unorphanedWords: string) => {
	const parent = element.cloneNode(true) as Element
	parent.removeAttribute('id')
	if ('style' in parent) {
		const parentHtmlElement = parent as HTMLElement
		// TODO: do a screen shot comparison with and without and decide then
		parentHtmlElement.style.width = `${element.getBoundingClientRect().width}px`
	}
	setContent(window.document.getElementById('offscreen-reveal'), parent)
	const [paddingLeft] = window.getComputedStyle(parent).paddingLeft.split('px')
	const [paddingRight] = window.getComputedStyle(parent).paddingLeft.split('px')

	if (typeof paddingLeft === 'undefined' || typeof paddingRight === 'undefined') {
		return false
	}

	const parentContentWidth = parent.getBoundingClientRect().width - +paddingLeft - +paddingRight
	removeContent(window.document.getElementById('offscreen-reveal'))

	const textContainer = element.cloneNode(true) as Element
	parent.removeAttribute('id')
	setContent(textContainer, unorphanedWords)
	setContent(window.document.getElementById('offscreen-nowrap'), textContainer)
	const textContainerWidth = textContainer.getBoundingClientRect().width
	removeContent(window.document.getElementById('offscreen-nowrap'))

	return textContainerWidth < half(parentContentWidth)
}

const areUnorphanedWordsShorterThanOtherWords = (unorphanedWords: string, otherWords: string) =>
	unorphanedWords.length < otherWords.length

const replaceLastWhiteSpaceWithNbsp = (element: Element, options: IOptions) => {
	const trimmedTextContent = element.textContent?.trim()

	if (
		!isNullish(trimmedTextContent) &&
		trimmedTextContent.includes(WHITE_SPACE) &&
		isLastSpaceRegularWhiteSpace(trimmedTextContent) &&
		isUnorphanable(trimmedTextContent)
	) {
		// TODO: if there is only one character before period, white space, emoji then add another &nbsp; in place of the previous white space
		const { unorphanedInnerHTML, unorphanedTextContent } = element.innerHTML.includes('<')
			? unorphanChildrenfullHTML(element)
			: unorphanChildrenlessHTML(element)
		const { unorphanedWords, otherWords } = getWords(unorphanedTextContent)

		// TODO: use this to write tests
		if (options.force) {
			element.innerHTML = unorphanedInnerHTML
		} else if (areUnorphanedWordsShorterThanHalfParentContentWidth(element, unorphanedWords)) {
			if (otherWords) {
				if (areUnorphanedWordsShorterThanOtherWords(unorphanedWords, otherWords)) {
					element.innerHTML = unorphanedInnerHTML
				} else {
					// TODO: is this the best way to organize this code??
					// DO NOTHING
				}
			} else {
				element.innerHTML = unorphanedInnerHTML
			}
		}
	}
}

const defaultOptions = {
	resize: false,
	resizeThrottleDelay: 0,
	force: false,
}

export const unorphan = (
	target: Element | Array<Element> | NodeListOf<Element> | null,
	options: IOptions = defaultOptions,
) => {
	if (target === null) {
		return
	}

	if (target instanceof window.Element) {
		replaceLastWhiteSpaceWithNbsp(target, options)
	} else {
		Array.from(target)
			.toReversed()
			.forEach((element) => void replaceLastWhiteSpaceWithNbsp(element, options))
	}

	options.onUnorphan && options.onUnorphan()

	if (options.resize) {
		const defaultResizeThrottleDelay = 500
		const resizeThrottleDelay = options.resizeThrottleDelay ?? defaultResizeThrottleDelay

		let lastUnorphaningTimestamp: number | undefined
		const handleResize = () => {
			const now = new Date().getTime()
			if (isNullish(lastUnorphaningTimestamp) || now - lastUnorphaningTimestamp > resizeThrottleDelay) {
				const recursiveOptions = { ...options }
				delete recursiveOptions.resize
				unorphan(target, recursiveOptions)
				lastUnorphaningTimestamp = now
			}
			window.setTimeout(() => handleResize, resizeThrottleDelay)
		}
		// TODO: add a way to remove event listener
		window.addEventListener('resize', handleResize)
	}
}

export const testExports = {
	isLastSpaceRegularWhiteSpace,
}
