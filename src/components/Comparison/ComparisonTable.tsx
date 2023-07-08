import type { FunctionalComponent } from 'preact'

import classes from './ComparisonTable.module.css'
import { Code } from '../Code/Code'
import { Link } from '../Link/Link'
import { headings } from '../TableOfContents/TableOfContents'

export const ComparisonTable: FunctionalComponent = () => {
	return (
		<div class={classes.tableContainer}>
			<table class={`${classes.table} vertical-spacing`}>
				<caption class={classes.caption}>CSS locks vs responsify</caption>
				<thead class={classes.thead}>
					<tr class={classes.tr}>
						<th class={classes.th}>Criterion</th>
						<th class={classes.th}>CSS locks</th>
						<th class={classes.th}>Responsify</th>
					</tr>
				</thead>
				<tbody class={classes.tbody}>
					<tr class={classes.tr}>
						<td class={classes.td}>Sass</td>
						{/* <!-- TODO: can CSS locks Sass function be used in all of the examples I have?? --> */}
						<td class={classes.td}>
							<Link href="https://codepen.io/andi1984/pen/yJARkv">CSS locks Sass function</Link>
						</td>
						<td class={classes.td}>
							<Link href={`#${headings.h2_5.id}`}>Responsify Sass function</Link>
						</td>
					</tr>
					<tr class={classes.tr}>
						<td class={classes.td}>PostCSS</td>
						<td class={classes.td}>
							<Link href="https://github.com/bramstein/postcss-scale">
								<Code>postcss-scale</Code>
							</Link>
						</td>
						<td class={classes.td}>
							No <span aria-hidden="true">❌</span>
						</td>
					</tr>
					<tr class={classes.tr}>
						<td class={classes.td}>Web interface</td>
						<td class={classes.td}>
							No <span aria-hidden="true">❌</span>
						</td>
						<td class={classes.td}>
							Yes <span aria-hidden="true">✅</span>
						</td>
					</tr>
					<tr class={classes.tr}>
						<td class={classes.td}>Since</td>
						<td class={classes.td}>2016</td>
						<td class={classes.td}>2019</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
