import type { FC } from 'react'
import { Link } from './Link/Link'
import { headings } from './TableOfContents/TableOfContents'
import { fromIsoDateToHumanDate } from '@/utils/fromIsoDateToHumanDate'

export const Updates: FC = () => {
	const updateDate = '2021-11-16'
	return (
		<dl className="vertical-spacing">
			<dt>
				<b>
					{/* TODO: extract time element to a separate UI component?? */}
					Update: <time dateTime={updateDate}>{fromIsoDateToHumanDate(updateDate)}</time>
				</b>
			</dt>
			<dd>
				Today I learned that responsify is a rediscovery of{' '}
				<Link href="https://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/">CSS locks</Link>.{' '}
				<span aria-hidden="true">🤦‍♂️</span> Read the{' '}
				<Link href={`#${headings.h2_7.id}`}>comparison between CSS locks and responsify</Link>.
			</dd>
		</dl>
	)
}
