import { isPlaintextLike, type PlaintextLikeNode } from '@/utils/isPlaintextLike'

export const getTextContent = (children: Exclude<React.ReactNode, PlaintextLikeNode>): string => {
	// TODO: replace with a better check for null
	if (!children) {
		return ''
		// TODO: doesn't handle nested number or boolean
	} else if (isPlaintextLike(children)) {
		return children
	} else if (Array.isArray(children)) {
		return children.reduce<string>(
			(accumulator, next) => `${accumulator}${isPlaintextLike(next) ? next : getTextContent(next.props.children)}`,
			'',
		)
	} else if (typeof children === 'object' && 'props' in children) {
		return getTextContent(children.props.children)
	} else {
		// TODO: handle bigint and function
		return ''
	}
}
