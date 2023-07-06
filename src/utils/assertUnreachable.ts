export const assertUnreachable = (_x: never) => {
	throw new Error('This ensures switch cases are handled')
}
