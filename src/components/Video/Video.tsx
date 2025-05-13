import type { FC } from 'react'
import styles from './Video.module.css'

export const Video: FC = () => {
	// <!-- TODO: maybe i can get around the fact that media attribute is not supported on video elements by showing the one with the appropriate id and not preloading either of them?? --><!-- <video className="video" preload="metadata" muted loop playsinline controls> -->
	// TODO: explain that this is a screen recording of the interactive example down below on the page
	// TODO: show fallback content if neither video loads
	return (
		<video className={styles.video} autoPlay muted loop playsInline controls>
			<source src="/screen-recording-265.mov" type="video/quicktime" />
			<source src="/screen-recording-264.mov" type="video/mp4" />
		</video>
	)
}
