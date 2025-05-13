import type { FC } from 'react'

import styles from './ComparisonTable.module.css'
import { Code } from '../Code/Code'
import { Link } from '../Link/Link'
import { headings } from '../TableOfContents/TableOfContents'

export const ComparisonTable: FC = () => {
	return (
		<div className={styles.tableContainer}>
			<table className={`${styles.table} vertical-spacing`}>
				<caption className={styles.caption}>CSS locks vs responsify</caption>
				<thead className={styles.thead}>
					<tr className={styles.tr}>
						<th className={styles.th}>Criterion</th>
						<th className={styles.th}>CSS locks</th>
						<th className={styles.th}>Responsify</th>
					</tr>
				</thead>
				<tbody className={styles.tbody}>
					<tr className={styles.tr}>
						<td className={styles.td}>Sass</td>
						{/* <!-- TODO: can CSS locks Sass function be used in all of the examples I have?? --> */}
						<td className={styles.td}>
							<Link href="https://codepen.io/andi1984/pen/yJARkv">CSS locks Sass function</Link>
						</td>
						<td className={styles.td}>
							<Link href={`#${headings.h2_5.id}`}>Responsify Sass function</Link>
						</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>PostCSS</td>
						<td className={styles.td}>
							<Link href="https://github.com/bramstein/postcss-scale">
								<Code>postcss-scale</Code>
							</Link>
						</td>
						<td className={styles.td}>
							No <span aria-hidden="true">❌</span>
						</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>Web interface</td>
						<td className={styles.td}>
							No <span aria-hidden="true">❌</span>
						</td>
						<td className={styles.td}>
							Yes <span aria-hidden="true">✅</span>
						</td>
					</tr>
					<tr className={styles.tr}>
						<td className={styles.td}>Since</td>
						<td className={styles.td}>2016</td>
						<td className={styles.td}>2019</td>
					</tr>
				</tbody>
			</table>
		</div>
	)
}
