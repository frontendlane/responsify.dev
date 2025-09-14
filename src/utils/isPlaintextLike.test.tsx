import { describe, expect, test } from 'vitest'
import { isPlaintextLike } from './isPlaintextLike'

describe('isPlaintextLike', () => {
	test('empty string', () => {
		expect(isPlaintextLike('')).toEqual(true)
	})
	test('whitespace', () => {
		expect(isPlaintextLike(' ')).toEqual(true)
	})
	test('negative one', () => {
		expect(isPlaintextLike(-1)).toEqual(true)
	})
	test('zero', () => {
		expect(isPlaintextLike(0)).toEqual(true)
	})
	test('one', () => {
		expect(isPlaintextLike(1)).toEqual(true)
	})
	test('NaN', () => {
		expect(isPlaintextLike(NaN)).toEqual(true)
	})
	test('bigint', () => {
		expect(isPlaintextLike(1n)).toEqual(true)
	})
	test('false', () => {
		expect(isPlaintextLike(false)).toEqual(false)
	})
	test('true', () => {
		expect(isPlaintextLike(true)).toEqual(false)
	})
	test('div', () => {
		expect(isPlaintextLike(<div />)).toEqual(false)
	})
	test('Fragment', () => {
		// eslint-disable-next-line react/jsx-no-useless-fragment
		expect(isPlaintextLike(<></>)).toEqual(false)
	})
	test('array', () => {
		expect(isPlaintextLike([])).toEqual(false)
	})
	test('null', () => {
		expect(isPlaintextLike(null)).toEqual(false)
	})
	test('undefined', () => {
		// eslint-disable-next-line no-undefined
		expect(isPlaintextLike(undefined)).toEqual(false)
	})
})
