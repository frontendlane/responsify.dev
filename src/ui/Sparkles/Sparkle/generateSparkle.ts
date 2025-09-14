import { hundredPercent } from '@/utils/constants'
import { random } from '@/utils/random'

const defaultColor = 'hsl(50deg, 100%, 50%)'
const smallestSparkleSizeInPx = 4
const largestSparkleSizeInPx = 64
const two = 2
const half = (value: number) => value / two

// safe offset means not overflowing container element by more than 50% of the *sparkle* size
const generateSafeOffset = (sparkleSize: number, containerSize: number) => {
	const unsafeOffset = random(0, hundredPercent)
	const maximumOverflow = half(sparkleSize)
	const doesOverflowBelowContent = (containerSize / hundredPercent) * unsafeOffset + maximumOverflow > containerSize
	const safeOffset = doesOverflowBelowContent ? `${containerSize - maximumOverflow}px` : `${unsafeOffset}%`
	return safeOffset
}

export const generateSparkle = (
	container: HTMLElement,
	cleanupCutoffInMs: number,
	type: 'static' | 'dynamic',
	color = defaultColor,
) => {
	const { width: contentWidth, height: contentHeight } = container.getBoundingClientRect()

	const largestSparkleSize = Math.min(half(Math.min(contentWidth, contentHeight)), largestSparkleSizeInPx)
	const size = random(smallestSparkleSizeInPx, largestSparkleSize)

	const minSparkleZIndex = 1
	const maxSparkleZIndex = 3
	const zIndex = random(minSparkleZIndex, maxSparkleZIndex) // favors being in front (2:1 ratio) because default z-index for the content is 2 (see Sparkles.module.css)

	return {
		id: crypto.randomUUID(),
		createdAt: Date.now(),
		color,
		size,
		style: {
			top: generateSafeOffset(size, contentHeight),
			left: generateSafeOffset(size, contentWidth),
			animationDuration: `${cleanupCutoffInMs}ms` /* ensures animation has time to finish */,
			zIndex,
			...(type === 'static'
				? {
						animationDelay: `-${random(0, cleanupCutoffInMs)}ms`,
						svgContainerAnimationName: 'nonExistentAnimationNameThatPreventsGrowAndShrinkAnimationFromPlaying',
					}
				: {}),
		},
	}
}

export type Sparkle = ReturnType<typeof generateSparkle>
