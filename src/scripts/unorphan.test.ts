import { describe, test, expect } from 'vitest'
import { testableExports } from './unorphan'

describe('isLastSpaceRegularWhiteSpace', () => {
	test('empty string', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('')).toEqual(false)
	})
	test('single regular whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace(' ')).toEqual(true)
	})
	test('multiple regular whitespaces', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(true)
	})
	test('single non-breaking whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace(' ')).toEqual(false)
	})
	test('multiple non-breaking whitespaces', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(false)
	})
	test('regular whitespace, character, regular whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace(' d ')).toEqual(true)
	})
	test('non-breaking whitespace, character, non-breaking whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace(' d ')).toEqual(false)
	})
	test('character, non-breaking whitespace, character', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('d d')).toEqual(false)
	})
	test('regular whitespace, non-breaking whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(false)
	})
	test('non-breaking whitespace, regular whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(true)
	})
	test('regular whitespace, non-breaking whitespace, regular whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('   ')).toEqual(true)
	})
	test('non-breaking whitespace, regular whitespace, non-breaking whitespace', () => {
		expect(testableExports.isLastSpaceRegularWhiteSpace('   ')).toEqual(false)
	})
})
