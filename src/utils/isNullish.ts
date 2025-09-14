// unlike nullish coalescing operator (e.g. `possiblyNullish?.value`) this actually narrows the typescript type
export const isNullish = (value: unknown): value is undefined | null => typeof value === 'undefined' || value === null
