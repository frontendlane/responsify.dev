// https://vladimirzdrazil.com/posts/object-keys-keyof-t/#i-understand-all-this-but-i-still-want-to-do-it
export const objectEntries = <Key extends PropertyKey, Value>(record: Record<Key, Value>) =>
	// eslint-disable-next-line no-restricted-syntax
	Object.entries(record) as Array<[Key, Value]>
