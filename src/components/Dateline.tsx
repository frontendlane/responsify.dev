import type { FC } from 'react'

export const Dateline: FC = () => {
	return (
		<aside className="vertical-spacing-150-percent">
			<p>
				<b>Published</b>: <time dateTime="2019-09-25">September 25, 2019</time>
			</p>
			<p>
				<b>Updated</b>: <time dateTime="2022-02-12">November 6, 2024</time>
			</p>
		</aside>
	)
}
