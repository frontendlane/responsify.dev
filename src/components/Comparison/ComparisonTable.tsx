import type { FC } from 'react'

import classes from './ComparisonTable.module.css'
import { Code } from '../Code/Code'
import { Link } from '../Link/Link'
import { headings } from '../TableOfContents/TableOfContents'

export const ComparisonTable: FC = () => {
	return (
		<div className={classes.tableContainer}>
			<table className={`${classes.table} vertical-spacing`}>
				<caption className={classes.caption}>CSS locks vs responsify</caption>
				<thead className={classes.thead}>
					<tr className={classes.tr}>
						<th className={classes.th}>Criterion</th>
						<th className={classes.th}>CSS locks</th>
						<th className={classes.th}>Responsify</th>
					</tr>
				</thead>
				<tbody className={classes.tbody}>
					<tr className={classes.tr}>
						<td className={classes.td}>Sass</td>
						{/* <!-- TODO: can CSS locks Sass function be used in all of the examples I have?? --> */}
						<td className={classes.td}>
							<Link href="https://codepen.io/andi1984/pen/yJARkv">CSS locks Sass function</Link>
						</td>
						<td className={classes.td}>
							<Link href={`#${headings.h2_5.id}`}>Responsify Sass function</Link>
						</td>
					</tr>
					<tr className={classes.tr}>
						<td className={classes.td}>PostCSS</td>
						<td className={classes.td}>
							<Link href="https://github.com/bramstein/postcss-scale">
								<Code>postcss-scale</Code>
							</Link>
						</td>
						<td className={classes.td}>
							No <span aria-hidden="true">❌</span>
						</td>
					</tr>
					<tr className={classes.tr}>
						<td className={classes.td}>Web interface</td>
						<td className={classes.td}>
							No <span aria-hidden="true">❌</span>
						</td>
						<td className={classes.td}>
							Yes <span aria-hidden="true">✅</span>
						</td>
					</tr>
					<tr className={classes.tr}>
						<td className={classes.td}>Since</td>
						<td className={classes.td}>2016</td>
						<td className={classes.td}>2019</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
