// asserts type guard *can* be arrow functions but they don't read well: https://github.com/microsoft/TypeScript/issues/34523#issuecomment-700491122
export function assertDefined<T>(value: T | null | undefined): asserts value is T {
	if (typeof value === 'undefined' || value === null) {
		throw new Error()
	}
}
