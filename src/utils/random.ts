export const random = (inclusiveMin: number, exclusiveMax: number) =>
	exclusiveMax <= inclusiveMin ? inclusiveMin : Math.floor(Math.random() * (exclusiveMax - inclusiveMin)) + inclusiveMin
