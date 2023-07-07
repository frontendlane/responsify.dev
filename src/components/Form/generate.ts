import { REM_SIZE_IN_PX } from '../../scripts/constants'
import { assertUnreachable } from '../../utils/assertUnreachable'
import type { FormValues } from './Form'

export const generateCss = ({
	cssProperty,
	unit,
	elementLowerBound,
	containerLowerBound,
	elementUpperBound,
	containerUpperBound,
	chWidthInPx,
}: FormValues) => {
	const removeLastCharacter = (word: string) => word.substring(0, word.length - 1)

	const trimUnnecessaryDigits = (number: number) => {
		let numberAsString = number.toFixed(3)
		while (numberAsString.endsWith('0')) {
			numberAsString = removeLastCharacter(numberAsString)
		}
		if (numberAsString.endsWith('.')) {
			numberAsString = removeLastCharacter(numberAsString)
		}
		return +numberAsString
	}

	const calculate = () => {
		let elementStartingSize: number
		switch (unit) {
			case 'px':
				elementStartingSize = elementLowerBound
				break
			case 'vw':
				elementStartingSize = (elementLowerBound / 100) * containerLowerBound
				break
			case '%':
				elementStartingSize = (elementLowerBound / 100) * containerLowerBound
				break
			case 'ch':
				elementStartingSize = elementLowerBound * (chWidthInPx as number)
				break
			case 'rem':
				elementStartingSize = elementLowerBound * REM_SIZE_IN_PX
				break
			default:
				elementStartingSize = assertUnreachable(unit)
		}

		let elementEndingSize
		switch (unit) {
			case 'px':
				elementEndingSize = elementUpperBound
				break
			case 'vw':
				elementEndingSize = (elementUpperBound / 100) * containerUpperBound
				break
			case '%':
				elementEndingSize = (elementUpperBound / 100) * containerUpperBound
				break
			case 'ch':
				elementEndingSize = elementUpperBound * (chWidthInPx as number)
				break
			case 'rem':
				elementEndingSize = elementUpperBound * REM_SIZE_IN_PX
				break
			default:
				elementEndingSize = assertUnreachable(unit)
		}

		const elementDiff = elementEndingSize - elementStartingSize
		const containerDiff = containerUpperBound - containerLowerBound
		const rate = elementDiff / containerDiff
		const initialInPx = elementStartingSize - containerLowerBound * rate

		let initial: number
		switch (unit) {
			case 'ch':
				initial = initialInPx / (chWidthInPx as number)
				break
			case 'rem':
				initial = initialInPx / REM_SIZE_IN_PX
				break
			default:
				initial = initialInPx
				break
		}

		return {
			containerLowerBound,
			containerUpperBound,
			elementLowerBound,
			elementUpperBound,
			initial,
			rate,
		}
	}

	const generate = () => {
		const { containerLowerBound, containerUpperBound, elementLowerBound, elementUpperBound, initial, rate } = calculate()

		const trimmedInitial = trimUnnecessaryDigits(initial)
		let initialUnit: string
		switch (unit) {
			case 'ch':
				initialUnit = unit
				break
			case 'rem':
				initialUnit = unit
				break
			default:
				initialUnit = 'px'
		}
		const sign = rate < 0 ? '-' : '+'
		const calcRate = trimUnnecessaryDigits(Math.abs(rate) * 100)
		const rateUnit = unit === '%' ? '%' : 'vw'

		return `${cssProperty}: calc(${trimmedInitial}${initialUnit} ${sign} ${calcRate}${rateUnit});${` /* https://responsify.dev - ${
			unit === '%' ? 'parent' : 'viewport'
		} lower bound: ${containerLowerBound}px; ${
			unit === '%' ? 'parent' : 'viewport'
		} upper bound: ${containerUpperBound}px; element lower bound: ${elementLowerBound}${unit}; element upper bound: ${elementUpperBound}${unit}; ${
			chWidthInPx ? `"ch" width in pixels: ${chWidthInPx}; ` : ''
		}*/`}`
	}

	return generate()
}
