// isn't this page specific?? and should thus go under src/pages/index/scripts
import { storage } from './storage'
import { ILocalState, ISessionState, IState, StorageType } from './types'

const initialState: IState = {
	unit: 'px',
	shouldIncludeComment: true,
	hasUsedForm: false,
}

export let state = initialState

const storageKeys = {
	[StorageType.local]: ['hasUsedForm'],
	[StorageType.session]: [
		'cssProperty',
		'elementLowerBound',
		'unit',
		'chWidthInPx',
		'containerLowerBound',
		'elementUpperBound',
		'containerUpperBound',
		'shouldIncludeComment',
	],
}

// TODO: add two overrides, one for local and one for session
const prepForStorage = (state: IState, storageType: StorageType) => {
	const filteredState: { [key: string]: any } = {}
	Object.entries(state)
		.filter(([stateKey]) => storageKeys[storageType].includes(stateKey))
		.forEach(([key, value]) => {
			if (storageKeys[storageType].includes(key)) {
				filteredState[key] = value
			}
		})

	return filteredState as ILocalState | ISessionState
}

const preserveToSession = () => {
	const sessionState = prepForStorage(state, StorageType.session)
	storage(StorageType.session)?.set(sessionState)
}

const preserveToLocal = () => {
	const localState = prepForStorage(state, StorageType.local)
	storage(StorageType.local)?.set(localState)
}

export const setState = (updatedState: IState | { [key: string]: any }) => {
	Object.assign(state, { ...updatedState })
	preserveToSession()
	preserveToLocal()
}
