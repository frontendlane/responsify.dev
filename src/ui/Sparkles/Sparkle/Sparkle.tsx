import type { SparkleConfig } from '../Sparkles'
import styles from './Sparkle.module.css'

type SparkleProps = {
	sparkle: SparkleConfig
}

export const Sparkle: React.FC<SparkleProps> = ({ sparkle }) => {
	return (
		<>
			<span
				className={styles.svgContainer}
				style={{
					insetBlockStart: sparkle.style.top,
					insetInlineStart: sparkle.style.left,
					animationDuration: sparkle.style.animationDuration,
					animationName: sparkle.style.svgContainerAnimationName,
					animationDelay: sparkle.style.animationDelay,
					zIndex: sparkle.style.zIndex,
				}}
			>
				<svg
					data-testid="sparkle-svg"
					className={styles.svg}
					width={sparkle.size}
					height={sparkle.size}
					style={{
						animationDuration: sparkle.style.animationDuration,
						animationDelay: sparkle.style.animationDelay,
					}}
					viewBox="0 0 160 160"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill={sparkle.color}
						d="M80 0C80 0 84.2846 41.2925 101.496 58.504C118.707 75.7154 160 80 160 80C160 80 118.707 84.2846 101.496 101.496C84.2846 118.707 80 160 80 160C80 160 75.7154 118.707 58.504 101.496C41.2925 84.2846 0 80 0 80C0 80 41.2925 75.7154 58.504 58.504C75.7154 41.2925 80 0 80 0Z"
					/>
				</svg>
			</span>
		</>
	)
}
