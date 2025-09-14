import { isPlaintextLike } from '@/utils/isPlaintextLike'
import { isNullish } from './isNullish'

// checks if the value is an array, set, or map
const isIterable = (value: React.ReactNode): value is Iterable<React.ReactNode> =>
	/* eslint-disable-next-line @typescript-eslint/no-explicit-any */ // TODO: can't figure out a way to not do a type casting to `any`
	!isNullish(value) && typeof (value as any)[Symbol.iterator] === 'function'

export const getTextContent = async (children: React.ReactNode): Promise<string> => {
	if (isNullish(children) || typeof children === 'boolean') {
		return ''
	} else if (isPlaintextLike(children)) {
		return String(children)
	} else if ('props' in children) {
		if (typeof children.props === 'object' && !isNullish(children.props) && 'children' in children.props) {
			return await getTextContent(children.props.children as React.ReactNode)
		} else {
			throw new Error('TODO:')
		}
	} else if (isIterable(children)) {
		return (await Promise.all(Array.from(children).map(async (child) => await getTextContent(child)))).join('')
	} else {
		return getTextContent(await children)
	}
}
