'use client'

import styles from './Sparkles.module.css'
import { useRef, useState, type PropsWithChildren } from 'react'
import { generateSparkle } from './Sparkle/generateSparkle'
import { Sparkle } from './Sparkle/Sparkle'
import { useRandomInterval } from '../../hooks/useRandomInterval'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export type SparkleConfig = ReturnType<typeof generateSparkle>

type SparklesProps = PropsWithChildren & {
	className?: string
}

// https://www.joshwcomeau.com/react/animated-sparkles-in-react/ + improvements:
// 1. sparkles are only and evenly distributed across the bounds of the element (in the original implementation the sparkles overflowed on the bottom of the element by as much as 100%). here they overflow 50% in all directions
export const Sparkles = ({ className, children }: SparklesProps) => {
	const [isSuspended, setIsSuspended] = useState(false)
	const [sparkles, setSparkles] = useState<Array<SparkleConfig>>([]) // must be empty array to avoid mismatched HTML when using SSG
	const prefersReducedMotion = usePrefersReducedMotion()
	const containerRef = useRef<HTMLElement>(null)

	const minimumDelayInMs = 50
	const maximumDelayInMs = 500

	useRandomInterval(
		() => {
			if (isSuspended) {
				sparkles.length > 0 && setSparkles([])
				return
			}

			const container = containerRef.current
			if (!container) {
				return
			}

			const now = Date.now()
			const cleanupCutoffInMs = 1200

			if (prefersReducedMotion) {
				const numberOfMotionlessSparkles = 7

				sparkles.length === 0 &&
					setSparkles(
						sparkles.concat(
							Array.from({ length: numberOfMotionlessSparkles }).map(() =>
								generateSparkle(container, cleanupCutoffInMs, 'static'),
							),
						),
					)
			} else {
				setSparkles(
					sparkles
						.filter((sparkle) => now - sparkle.createdAt < cleanupCutoffInMs)
						.concat(generateSparkle(container, cleanupCutoffInMs, 'dynamic')),
				)
			}
		},
		minimumDelayInMs,
		maximumDelayInMs,
	)

	return (
		<button type="button" onClick={() => setIsSuspended(!isSuspended)} className={`${styles.container} ${className}`}>
			<strong className={styles.strong} ref={containerRef}>
				{children}
			</strong>
			{sparkles.map((sparkle) => (
				<Sparkle key={sparkle.id} sparkle={sparkle} />
			))}
		</button>
	)
}
