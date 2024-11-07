import { describe, expect, test } from 'vitest'
import { getTextContent } from './getTextContent'

describe('getTextContent', () => {
	// TODO: add tests for individual parts
	test('complex node', () => {
		expect(
			getTextContent(
				<div>
					<span>lone string</span>
					<span>{123}</span>
					<span>{false}</span>
					<span>{1n}</span>
					<span>{null}</span>
					<span>{undefined}</span>
					<span>
						<em>
							<span>nested</span>
						</em>
					</span>
					<span>
						joined string {987} {true}
					</span>
				</div>,
			),
		).toEqual('lone string123nestedjoined string 987 true')
	})
})
