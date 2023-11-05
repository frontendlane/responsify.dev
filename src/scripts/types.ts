export enum StorageType {
    local = 'local',
    session = 'session'
}

export interface IState {
    cssProperty?: string
    elementLowerBound?: number
    unit: string
    chWidthInPx?: number
    containerLowerBound?: number
    elementUpperBound?: number
    containerUpperBound?: number
    shouldIncludeComment: boolean
    hasUsedForm: boolean
}

export interface ILocalState {
    hasUsedForm: boolean
}

export interface ISessionState {
    cssProperty: string
    elementLowerBound: number
    unit: string
    chWidthInPx: number
    containerLowerBound: number
    elementUpperBound: number
    containerUpperBound: number
    shouldIncludeComment: boolean
}

export interface IAttributes {
    [key: string]: string | number | boolean
}
