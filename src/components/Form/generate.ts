import { REM_SIZE_IN_PX } from '../../scripts/constants'
import type { FormValues } from './Form'

// TODO: move all of this to zod schema
export const generateCss = ({ cssProperty, unit, chWidthInPx }: FormValues) => {
	const isValidNumber = (anything: any) => typeof anything === 'number' && !Number.isNaN(anything)

	const getCalculationValues = () => {
		const elementLowerBound = (window.document.getElementById('element-lower-bound') as HTMLInputElement).valueAsNumber
		const chWidthInPx = (window.document.getElementById('ch-width-in-px') as HTMLInputElement | null)?.valueAsNumber
		const containerLowerBound = (window.document.getElementById('container-lower-bound') as HTMLInputElement)
			.valueAsNumber
		const elementUpperBound = (window.document.getElementById('element-upper-bound') as HTMLInputElement).valueAsNumber
		const containerUpperBound = (window.document.getElementById('container-upper-bound') as HTMLInputElement)
			.valueAsNumber

		// NOTE: TypeScript does not recognize that if any of these values is undefined that it will throw an error
		if (
			[elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound].some(
				(value) => !isValidNumber(value)
			)
		) {
			throw new Error(
				'Invalid number value for one (or more) of the following: element lower bound, container lower bound, element upper bound, container upper bound.'
			)
		}

		if (unit === 'ch' && !isValidNumber(chWidthInPx)) {
			throw new Error('Invalid number value for "ch" width ix pixels.')
		}

		return { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound, chWidthInPx }
	}

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
		const { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound, chWidthInPx } =
			getCalculationValues()

		let elementStartingSize
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
				throw new Error('Unsupported CSS unit.')
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
				throw new Error('Unsupported CSS unit.')
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
