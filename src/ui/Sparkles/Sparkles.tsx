'use client'

import styles from './Sparkles.module.css'
import { useRef, useState, type FC, type PropsWithChildren } from 'react'
import { useRandomInterval } from '@/hooks/useRandomInterval'
import { generateSparkle } from './Sparkle/generateSparkle'
import { Sparkle } from './Sparkle/Sparkle'

export type SparkleConfig = ReturnType<typeof generateSparkle>

type SparklesProps = PropsWithChildren & {}

export const Sparkles: FC<SparklesProps> = ({ children }) => {
	const [sparkles, setSparkles] = useState<Array<SparkleConfig>>([])

	const minimumDelayInMs = 50
	const maximumDelayInMs = 500

	useRandomInterval(
		() => {
			const cleanupCutoffInMs = 1200
			const now = Date.now()

			contentContainerRef.current &&
				setSparkles(
					sparkles
						.filter((sparkle) => now - sparkle.createdAt < cleanupCutoffInMs)
						.concat(generateSparkle(contentContainerRef.current, cleanupCutoffInMs)),
				)
		},
		minimumDelayInMs,
		maximumDelayInMs,
	)

	const contentContainerRef = useRef<HTMLElement>(null)

	return (
		<span className={styles.container}>
			<strong ref={contentContainerRef}>{children}</strong>
			{sparkles.map((sparkle) => (
				<Sparkle key={sparkle.id} sparkle={sparkle} />
			))}
		</span>
	)
}
