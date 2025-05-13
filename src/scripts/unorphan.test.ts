import { describe, test, expect } from 'vitest'
import { testExports } from './unorphan'

describe('isLastSpaceRegularWhiteSpace', () => {
	test('empty string', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('')).toEqual(false)
	})
	test('single regular whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace(' ')).toEqual(true)
	})
	test('multiple regular whitespaces', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(true)
	})
	test('single non-breaking whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace(' ')).toEqual(false)
	})
	test('multiple non-breaking whitespaces', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(false)
	})
	test('regular whitespace, character, regular whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace(' d ')).toEqual(true)
	})
	test('non-breaking whitespace, character, non-breaking whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace(' d ')).toEqual(false)
	})
	test('character, non-breaking whitespace, character', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('d d')).toEqual(false)
	})
	test('regular whitespace, non-breaking whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(false)
	})
	test('non-breaking whitespace, regular whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('  ')).toEqual(true)
	})
	test('regular whitespace, non-breaking whitespace, regular whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('   ')).toEqual(true)
	})
	test('non-breaking whitespace, regular whitespace, non-breaking whitespace', () => {
		expect(testExports.isLastSpaceRegularWhiteSpace('   ')).toEqual(false)
	})
})
