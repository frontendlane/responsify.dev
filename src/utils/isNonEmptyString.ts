import { isNullish } from './isNullish'

export const isNonEmptyString = (maybeEmptyString: string | undefined | null): maybeEmptyString is string =>
	!isNullish(maybeEmptyString) && maybeEmptyString.length > 0
