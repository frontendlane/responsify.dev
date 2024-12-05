'use client'

import styles from './Sparkles.module.css'
import { useRef, useState, type FC, type PropsWithChildren } from 'react'
import { useRandomInterval } from '@/hooks/useRandomInterval'
import { generateSparkle } from './Sparkle/generateSparkle'
import { Sparkle } from './Sparkle/Sparkle'
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion'

export type SparkleConfig = ReturnType<typeof generateSparkle>

type SparklesProps = PropsWithChildren & {
	className?: string
}

// heavily borrowed from https://www.joshwcomeau.com/react/animated-sparkles-in-react/
export const Sparkles: FC<SparklesProps> = ({ className, children }) => {
	const [isSuspended, setIsSuspended] = useState(false)
	const [sparkles, setSparkles] = useState<Array<SparkleConfig>>([]) // must be empty array to avoid mismatched HTML when using SSG
	const prefersReducedMotion = usePrefersReducedMotion()
	const containerRef = useRef<HTMLElement>(null)

	const minimumDelayInMs = 50
	const maximumDelayInMs = 500

	useRandomInterval(
		() => {
			if (isSuspended) {
				sparkles.length && setSparkles([])
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
		<button onClick={() => setIsSuspended(!isSuspended)} className={`${styles.container} ${className}`}>
			<strong className={styles.strong} ref={containerRef}>
				{children}
			</strong>
			{sparkles.map((sparkle) => (
				<Sparkle key={sparkle.id} sparkle={sparkle} />
			))}
		</button>
	)
}
