// https://vladimirzdrazil.com/posts/object-keys-keyof-t/#i-understand-all-this-but-i-still-want-to-do-it
export const objectFromEntries = <Key extends PropertyKey, Value>(pairs: Array<[Key, Value]>) =>
	// eslint-disable-next-line no-restricted-syntax
	Object.fromEntries(pairs) as Record<Key, Value>
