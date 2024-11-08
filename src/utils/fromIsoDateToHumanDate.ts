export const fromIsoDateToHumanDate = (datetime: string) =>
	new Date(datetime).toLocaleString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
