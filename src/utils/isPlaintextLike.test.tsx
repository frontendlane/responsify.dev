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
	test('false', () => {
		expect(isPlaintextLike(false)).toEqual(true)
	})
	test('true', () => {
		expect(isPlaintextLike(true)).toEqual(true)
	})
	test('div', () => {
		expect(isPlaintextLike(<div></div>)).toEqual(false)
	})
	test('Fragment', () => {
		expect(isPlaintextLike(<></>)).toEqual(false)
	})
	test('array', () => {
		expect(isPlaintextLike([])).toEqual(false)
	})
	test('null', () => {
		expect(isPlaintextLike(null)).toEqual(false)
	})
	test('undefined', () => {
		expect(isPlaintextLike(undefined)).toEqual(false)
	})
	test('bigInt', () => {
		expect(isPlaintextLike(1n)).toEqual(false)
	})
})
