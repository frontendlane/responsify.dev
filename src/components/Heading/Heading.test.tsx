import { describe, expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'
import { Heading } from './Heading'

describe('Heading', () => {
	test('ensures id attribute does not contain whitespace', () => {
		const id = ' something '
		render(<Heading id={id} level="h1" />)
		expect(screen.getByRole('link').getAttribute('aria-labelledby')).toEqual('something')
	})
	// TODO: add test whether a double heading is in the DOM for non-plaintext-like children
	// TODO: add test for aria attribute
})
