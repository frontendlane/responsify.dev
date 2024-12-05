import { useEffect, useState } from 'react'

// taken from https://www.joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion/
const mediaQuery = '(prefers-reduced-motion: no-preference)'

const isRenderingOnServer = typeof window === 'undefined'

// For initial server render, we won't know if the user prefers reduced motion, but it doesn't matter. This value will be overwritten on the client, before any animations occur.
const getInitialState = () => (isRenderingOnServer ? true : !window.matchMedia(mediaQuery).matches)

export const usePrefersReducedMotion = () => {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(getInitialState)

	useEffect(() => {
		const mediaQueryList = window.matchMedia(mediaQuery)

		const listener = (event: MediaQueryListEvent) => setPrefersReducedMotion(!event.matches)

		if (mediaQueryList.addEventListener) {
			mediaQueryList.addEventListener('change', listener)
		} else {
			mediaQueryList.addListener(listener) // Safari
		}

		return () => {
			if (mediaQueryList.removeEventListener) {
				mediaQueryList.removeEventListener('change', listener)
			} else {
				mediaQueryList.removeListener(listener)
			}
		}
	}, [])

	return prefersReducedMotion
}
