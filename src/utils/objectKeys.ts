// https://vladimirzdrazil.com/posts/object-keys-keyof-t/#i-understand-all-this-but-i-still-want-to-do-it
// eslint-disable-next-line no-restricted-syntax
export const objectKeys = <Key extends PropertyKey>(array: Record<Key, unknown>) => Object.keys(array) as Array<Key>
