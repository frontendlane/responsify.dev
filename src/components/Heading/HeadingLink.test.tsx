import { describe, expect, test } from 'vitest'
import { HeadingLink } from './HeadingLink'
import { screen, render } from '@testing-library/react'

describe('HeadingLink', () => {
	test('consists of a single hash character', () => {
		render(<HeadingLink id="" />)
		expect(screen.getByRole('link')).toHaveTextContent('#')
	})
})
