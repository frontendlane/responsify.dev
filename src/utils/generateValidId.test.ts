import { describe, expect, test, vi } from 'vitest'
import { generateValidId } from './generateValidId'

describe('generateValidId', () => {
	const mockedCryptoRandomUUID = 'mocked-random-id'
	const mockRandomUUID = vi.fn(() => mockedCryptoRandomUUID)
	vi.spyOn(crypto, 'randomUUID').mockImplementation(mockRandomUUID)

	test('empty string', () => {
		expect(generateValidId('')).toEqual(mockedCryptoRandomUUID)
	})

	test('one whitespace', () => {
		expect(generateValidId(' ')).toEqual(mockedCryptoRandomUUID)
	})

	test('two whitespaces', () => {
		expect(generateValidId('  ')).toEqual(mockedCryptoRandomUUID)
	})

	test('three whitespaces', () => {
		expect(generateValidId('   ')).toEqual(mockedCryptoRandomUUID)
	})

	test('whitespace, non-breaking whitespace, whitespace', () => {
		expect(generateValidId('   ')).toEqual(mockedCryptoRandomUUID)
	})

	test('non-breaking whitespace, whitespace', () => {
		expect(generateValidId('  ')).toEqual(mockedCryptoRandomUUID)
	})

	test('whitespace, non-breaking whitespace', () => {
		expect(generateValidId('  ')).toEqual(mockedCryptoRandomUUID)
	})

	test('non-breaking whitespace, whitespace, non-breaking whitespace', () => {
		expect(generateValidId('   ')).toEqual(mockedCryptoRandomUUID)
	})

	test('angle bracket', () => {
		expect(generateValidId('<')).toEqual(mockedCryptoRandomUUID)
	})

	test('tilde', () => {
		expect(generateValidId('~')).toEqual(mockedCryptoRandomUUID)
	})

	test('double quotation sign', () => {
		expect(generateValidId('"')).toEqual(mockedCryptoRandomUUID)
	})

	test('single quotation sign', () => {
		expect(generateValidId("'")).toEqual(mockedCryptoRandomUUID)
	})

	test('do not replace leading and trailing whitespaces with hyphens', () => {
		expect(generateValidId(' valid ')).toEqual('valid')
	})

	test('string of a single-digit number', () => {
		expect(generateValidId('1')).toEqual('id-1')
	})

	test('string of a multi-digit number', () => {
		expect(generateValidId('123')).toEqual('id-123')
	})
})
