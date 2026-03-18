/* eslint-disable no-undefined */
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
					<b>
						<i />
					</b>
					<span>{undefined}</span>
					<span>
						<em>
							<span>nested</span>
							<span>{false}-</span>
							<span />
							<span>{`${false}-`}</span>
						</em>
					</span>
					<span>
						joined string {987} {true}
					</span>
				</div>,
			),
		).toEqual('lone string1231nested-false-joined string 987 ')
	})
})
