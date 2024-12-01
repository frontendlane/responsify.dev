import { describe, expect, test } from 'vitest'
import { generateSparkle } from './generateSparkle'

describe('generateSparkle', () => {
	test('generates non-existent animation-name for static sparkles to ensure their maximum size', () => {
		const sparkle = generateSparkle(document.createElement('div'), 1000, 'static')
		expect(sparkle.style.svgContainerAnimationName).toBeDefined()
	})
})
