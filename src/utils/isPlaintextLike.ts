const plaintextLikeNodes = ['string', 'number', 'boolean']
export type PlaintextLikeNode = string | number | boolean

export const isPlaintextLike = (content: React.ReactNode): content is PlaintextLikeNode =>
	plaintextLikeNodes.includes(typeof content)
