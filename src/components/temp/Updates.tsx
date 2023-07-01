import type { FunctionalComponent } from 'preact'
import { Link } from '../Link/Link'

export const Updates: FunctionalComponent = () => {
	return (
		<dl class="vertical-spacing">
			<dt>
				<b>
					Update: <time dateTime="2021-11-16">November 16, 2021</time>
				</b>
			</dt>
			<dd>
				Today I learned that responsify is a rediscovery of
				<Link href="https://blog.typekit.com/2016/08/17/flexible-typography-with-css-locks/">CSS locks</Link>
				.🤦‍♂️ Read the
				<Link href="#comparison">comparison between CSS locks and responsify</Link>.
			</dd>
		</dl>
	)
}
