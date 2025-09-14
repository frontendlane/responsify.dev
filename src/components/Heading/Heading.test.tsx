import { describe, expect, test } from 'vitest'
import { screen, render } from '@testing-library/react'
import { Heading } from './Heading'

// TODO: in addition to testing Heading component, also test generateValidId function
describe('Heading', () => {
	test('ensures id attribute does not contain whitespace', () => {
		const id = ' something '
		render(
			<Heading id={id} level="h1">
				Must have content
			</Heading>,
		)
		expect(screen.getByRole('link')).toHaveAttribute('aria-labelledby', id.trim())
	})
	// TODO: add test whether a double heading is in the DOM for non-plaintext-like children
	// TODO: add test for aria attribute
})
