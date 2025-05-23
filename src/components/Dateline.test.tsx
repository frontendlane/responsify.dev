import { render, screen } from '@testing-library/react'
import { Dateline } from './Dateline'
import { describe, expect, test } from 'vitest'
import { fromIsoDateToHumanDate } from '@/utils/fromIsoDateToHumanDate'
import { assertDefined } from '@/utils/assertDefined'

describe('Dateline datetime attribute matches rendered date', () => {
	test('published date', () => {
		render(<Dateline />)
		const timeElement = screen.getByTestId('published')
		const datetime = timeElement.getAttribute('datetime')
		assertDefined(datetime)
		expect(fromIsoDateToHumanDate(datetime)).toEqual(timeElement.textContent)
	})

	test('updated date', () => {
		render(<Dateline />)
		const timeElement = screen.getByTestId('updated')
		const datetime = timeElement.getAttribute('datetime')
		assertDefined(datetime)
		expect(fromIsoDateToHumanDate(datetime)).toEqual(timeElement.textContent)
	})
})
