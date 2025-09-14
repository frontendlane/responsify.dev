import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import type { Sparkle } from './Sparkle/generateSparkle'

const mockReturnValue: Sparkle = {
	id: crypto.randomUUID(),
	createdAt: Date.now(),
	color: 'whatever',
	size: 0,
	style: {
		top: '',
		left: '',
		animationDuration: '',
		zIndex: 1,
	},
}

describe('Sparkles', () => {
	// TODO: separate tests by prefers-reduced-motion
	test('removes sparkles when animation is suspended', async () => {
		const { Sparkles } = await import('./Sparkles')
		render(<Sparkles />)

		await waitFor(() => screen.getByTestId('sparkle-svg'))
		await act(() => userEvent.click(screen.getByRole('button')))
		await waitFor(() => expect(screen.queryByTestId('sparkle-svg')).not.toBeInTheDocument())
	})
	test('does NOT generate sparkles when animation is suspended', async () => {
		vi.resetModules()
		vi.doMock('./Sparkle/generateSparkle', async (fileExports) => ({
			...(await fileExports()),
			generateSparkle: vi.fn().mockReturnValueOnce(mockReturnValue),
		}))

		const { generateSparkle } = await import('./Sparkle/generateSparkle')
		const { Sparkles } = await import('./Sparkles')

		render(<Sparkles />)

		await waitFor(() => screen.getByTestId('sparkle-svg'))
		expect(generateSparkle).toHaveBeenCalledOnce()
		await act(() => userEvent.click(screen.getByRole('button')))
		await act(async () => {
			const arbitraryWaitTimeInMs = 1000
			await new Promise((resolve) => void setTimeout(resolve, arbitraryWaitTimeInMs))
		})
		expect(screen.queryByTestId('sparkle-svg')).not.toBeInTheDocument()
		expect(generateSparkle).toHaveBeenCalledOnce()
	})
})
