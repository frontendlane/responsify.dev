import { describe, expect, test } from 'vitest'
import { assertDefined } from './assertDefined'

describe('assertDefined', () => {
	test('null', () => {
		const value = null
		expect(() => assertDefined(value)).toThrowError()
	})
	test('undefined', () => {
		const value = undefined
		expect(() => assertDefined(value)).toThrowError()
	})
	test('string', () => {
		const value = 'value'
		expect(() => assertDefined(value)).not.toThrowError()
	})
	test('empty string', () => {
		const value = ''
		expect(() => assertDefined(value)).not.toThrowError()
	})
	test('number', () => {
		const value = 123
		expect(() => assertDefined(value)).not.toThrowError()
	})
	test('NaN', () => {
		const value = NaN
		expect(() => assertDefined(value)).not.toThrowError()
	})
	test('zero', () => {
		const value = 0
		expect(() => assertDefined(value)).not.toThrowError()
	})
	test('false', () => {
		const value = false
		expect(() => assertDefined(value)).not.toThrowError()
	})
})
