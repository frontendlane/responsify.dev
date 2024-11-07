type PreactChild = {
	props: {
		children: Child
	}
}
type Child = string | PreactChild
type Children = Child | Child[]

export const getTextContent = (children: Children): string => {
	if (typeof children === 'string') {
		return children
	} else if (Array.isArray(children)) {
		return children.reduce<string>(
			(accumulator, next) => `${accumulator}${typeof next === 'string' ? next : getTextContent(next.props.children)}`,
			''
		)
	} else {
		return getTextContent(children.props.children)
	}
}
