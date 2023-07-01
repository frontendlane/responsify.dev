import type { FunctionalComponent } from 'preact'

export const Dateline: FunctionalComponent = () => {
	return (
		<aside class="vertical-spacing-150-percent">
			<p>
				<b>Published</b>: <time dateTime="2019-09-25">September 25, 2019</time>
			</p>
			<p>
				<b>Updated</b>: <time dateTime="2022-02-12">April 2, 2023</time>
			</p>
		</aside>
	)
}
