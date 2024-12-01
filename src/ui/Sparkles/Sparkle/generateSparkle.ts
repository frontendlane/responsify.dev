import { random } from '@/utils/random'

const defaultColor = 'hsl(50deg, 100%, 50%)'
const smallestSparkleSizeInPx = 4
const two = 2
const half = (value: number) => value / two

// safe offset means not overflow the container element by more than 50% of the *sparkle* size
const generateSafeOffset = (sparkleSize: number, containerSize: number) => {
	const unsafeOffset = random(0, 100)
	const maximumOverflow = half(sparkleSize)
	const doesOverflowBelowContent = (containerSize / 100) * unsafeOffset + maximumOverflow > containerSize
	const safeOffset = doesOverflowBelowContent ? `${containerSize - maximumOverflow}px` : unsafeOffset + '%'
	return safeOffset
}

export const generateSparkle = (contentContainer: HTMLElement, cleanupCutoffInMs: number, color = defaultColor) => {
	const { width: contentWidth, height: contentHeight } = contentContainer.getBoundingClientRect()

	const largestSparkleSize = half(Math.min(contentWidth, contentHeight))
	const size = random(smallestSparkleSizeInPx, largestSparkleSize)

	return {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		color,
		size,
		style: {
			top: generateSafeOffset(size, contentHeight),
			left: generateSafeOffset(size, contentWidth),
			animationDuration: `${cleanupCutoffInMs}ms` /* ensures animation has time to finish */,
		},
	}
}
