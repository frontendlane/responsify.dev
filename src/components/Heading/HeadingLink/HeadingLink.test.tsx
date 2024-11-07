import { describe, expect, test } from 'vitest'
import { HeadingLink } from './HeadingLink'
import { screen, render } from '@testing-library/react'

describe('HeadingLink', () => {
	test('consists of a single hash character', () => {
		render(<HeadingLink id="" />)
		expect(screen.getByRole('link')).toHaveTextContent('#')
	})

	test('is an anchor', () => {
		render(<HeadingLink id="" />)
		expect(screen.getByRole('link')).toHaveAttribute('href', expect.stringMatching(/^#/))
	})

	test('is aria labelled', () => {
		const id = 'id'
		render(<HeadingLink id={id} />)
		expect(screen.getByRole('link').getAttribute('aria-labelledby')).toEqual(id)
	})
})
