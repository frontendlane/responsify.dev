export const random = (inclusiveMin: number, exclusiveMax: number) =>
	inclusiveMin < exclusiveMax ? inclusiveMin : Math.floor(Math.random() * (exclusiveMax - inclusiveMin)) + inclusiveMin
