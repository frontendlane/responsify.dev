const plaintextLikeNodeTypeofs = ['string', 'number', 'bigint']
// TODO: figure out a way to map from the values of the string, maybe `infer` can help here?
export type PlaintextLikeNode = string | number | bigint

export const isPlaintextLike = (content: React.ReactNode): content is PlaintextLikeNode =>
	plaintextLikeNodeTypeofs.includes(typeof content)
