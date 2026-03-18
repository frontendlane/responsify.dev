import { REM_SIZE_IN_PX } from '../../scripts/constants'
import { assertUnreachable } from '../../utils/assertUnreachable'
import { hundredPercent } from '../../utils/constants'
import { isNullish } from '../../utils/isNullish'
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
	const cssCalcSignificantDecimalPlaces = 3 // can't find the original article that claimed 3 decimal places were sufficient even in calc() operations that would blow up the rounded-off part. but here's a similar article: https://gehrcke.de/2013/02/save-some-css-traffic-round-percentages-with-less

	const trimUnnecessaryDigits = (number: number) => {
		let numberAsString = number.toFixed(cssCalcSignificantDecimalPlaces)
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
				elementStartingSize = (elementLowerBound / hundredPercent) * containerLowerBound
				break
			case '%':
				elementStartingSize = (elementLowerBound / hundredPercent) * containerLowerBound
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
				elementEndingSize = (elementUpperBound / hundredPercent) * containerUpperBound
				break
			case '%':
				elementEndingSize = (elementUpperBound / hundredPercent) * containerUpperBound
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
			initial,
			rate,
		}
	}

	const generate = () => {
		const { initial, rate } = calculate()

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
		const calcRate = trimUnnecessaryDigits(Math.abs(rate) * hundredPercent)
		const rateUnit = unit === '%' ? '%' : 'vw'

		return `${cssProperty}: calc(${trimmedInitial}${initialUnit} ${sign} ${calcRate}${rateUnit});${` /* https://responsify.dev - ${
			unit === '%' ? 'parent' : 'viewport'
		} lower bound: ${containerLowerBound}px; ${
			unit === '%' ? 'parent' : 'viewport'
		} upper bound: ${containerUpperBound}px; element lower bound: ${elementLowerBound}${unit}; element upper bound: ${elementUpperBound}${unit}; ${
			isNullish(chWidthInPx) ? '' : `"ch" width in pixels: ${chWidthInPx}; `
		}*/`}`
	}

	return generate()
}
