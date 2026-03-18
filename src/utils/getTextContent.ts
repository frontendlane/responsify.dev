import { isPlaintextLike } from '@/utils/isPlaintextLike'
import { isNullish } from './isNullish'
import { isValidElement } from 'react'

// checks if the value is an array, set, or map
const isIterable = (value: React.ReactNode): value is Iterable<React.ReactNode> =>
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // TODO: can't figure out a way to not do a type casting to `any`
	!isNullish(value) && typeof (value as any)[Symbol.iterator] === 'function'

export const getTextContent = (children: React.ReactNode): string => {
	if (isNullish(children) || typeof children === 'boolean') {
		return ''
	} else if (isPlaintextLike(children)) {
		return String(children)
	} else if (isValidElement(children)) {
		if (typeof children.props === 'object' && !isNullish(children.props) && 'children' in children.props) {
			return getTextContent(children.props.children as React.ReactNode)
		} else {
			// node without textContent e.g. <b />
			return ''
		}
	} else if (isIterable(children)) {
		return Array.from(children)
			.map((child) => getTextContent(child))
			.join('')
	} else {
		throw new Error('Thenable children')
	}
}
