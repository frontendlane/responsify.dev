import { random } from '@/utils/random'
import { useRef, useEffect, useCallback } from 'react'

export const useRandomInterval = (callback: () => void, minDelay: number, maxDelay: number) => {
	const timeoutId = useRef<number | null>(null)
	const savedCallback = useRef(callback)

	useEffect(() => {
		savedCallback.current = callback
	}, [callback])

	useEffect(() => {
		const isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number'

		if (isEnabled) {
			const handleTick = () => {
				const nextTickAt = random(minDelay, maxDelay)

				timeoutId.current = window.setTimeout(() => {
					savedCallback.current()
					handleTick()
				}, nextTickAt)
			}

			handleTick()
		}

		return () => {
			timeoutId.current && window.clearTimeout(timeoutId.current)
		}
	}, [minDelay, maxDelay])

	const cancel = useCallback(function () {
		timeoutId.current && window.clearTimeout(timeoutId.current)
	}, [])

	return cancel
}
