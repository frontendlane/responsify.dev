import { EMPTY_STRING, HYPHEN } from './constants'

export const generateValidId = (string: string) => {
	const sanitized = string
		.trim()
		.replace(/[^a-zA-Z0-9_-]/g, HYPHEN)
		.replace(/-+/g, HYPHEN)
	const slug = sanitized === EMPTY_STRING || sanitized === HYPHEN ? crypto.randomUUID() : sanitized
	return /^[a-zA-Z_]/.test(slug) ? slug : 'id-' + slug
}
