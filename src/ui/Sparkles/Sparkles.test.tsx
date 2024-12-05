import { screen, render, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi, type Mock } from 'vitest'
import { Sparkles } from './Sparkles'
import type { generateSparkle } from './Sparkle/generateSparkle'

const mockReturnValue: ReturnType<typeof generateSparkle> = {
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
	test('removes sparkles when animation is suspended', async () => {
		render(<Sparkles />)

		await waitFor(() => screen.getByTestId('sparkle-svg'))
		await act(() => userEvent.click(screen.getByRole('button')))
		await waitFor(() => expect(screen.queryByTestId('sparkle-svg')).not.toBeInTheDocument())
	})
	test('does NOT generate sparkles when animation is suspended', async () => {
		vi.resetModules()
		vi.doMock('./Sparkle/generateSparkle', async (generateSparkle) => ({
			...(await generateSparkle()),
			generateSparkle: vi.fn().mockReturnValueOnce(mockReturnValue),
		}))

		const { generateSparkle } = await import('./Sparkle/generateSparkle')
		const { Sparkles } = await import('./Sparkles')

		render(<Sparkles />)

		await waitFor(() => screen.getByTestId('sparkle-svg'))
		expect(generateSparkle).toHaveBeenCalledOnce()
		await act(() => userEvent.click(screen.getByRole('button')))
		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 1000))
		})
		expect(screen.queryByTestId('sparkle.svg')).not.toBeInTheDocument()
		expect(generateSparkle).toHaveBeenCalledOnce()
	})
})
