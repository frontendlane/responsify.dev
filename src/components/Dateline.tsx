import { fromIsoDateToHumanDate } from '../utils/fromIsoDateToHumanDate'

export const Dateline = () => {
	const publishedDate = '2019-09-25'
	const updatedDate = '2026-03-24'

	return (
		<aside className="verticalSpacing150Percent">
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
