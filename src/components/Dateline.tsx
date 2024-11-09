import { fromIsoDateToHumanDate } from '@/utils/fromIsoDateToHumanDate'
import type { FC } from 'react'

export const Dateline: FC = () => {
	const publishedDate = '2019-09-25'
	const updatedDate = '2024-11-08'

	return (
		<aside className="vertical-spacing-150-percent">
			<p>
				<b>Published</b>:{' '}
				<time dateTime={publishedDate} data-testid="published">
					{fromIsoDateToHumanDate(publishedDate)}
				</time>
			</p>
			<p>
				<b>Updated</b>:{' '}
				<time dateTime={updatedDate} data-testid="updated">
					{fromIsoDateToHumanDate(updatedDate)}
				</time>
			</p>
		</aside>
	)
}
