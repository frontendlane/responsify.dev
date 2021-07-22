import { ISessionState, ILocalState, IState, StorageType } from "./types";

const storageKey = '__fel-responsify';

export const storage = (storageType: StorageType) => {
    let storageSource: Storage | undefined;
    try {
        switch (storageType) {
            case StorageType.local:
                storageSource = window.localStorage
                break;
            case StorageType.session:
                storageSource = window.sessionStorage
                break;
            default:
                throw new Error(`Unsupported storage source: "${storageType}".`); // when brower settings forbid access e.g. Chrome with "Block all cookies"
        }
    } catch (error) {
        // TODO: show a notification to the user instead of logging the error to the console (app wide)
        console.error(error);
        return;
    }

    const storageMethods = {
        get: () => {
            // TODO: why are these TS errors??
            // @ts-ignore
            const rawContents = storageSource.getItem(storageKey);
            // TODO: prioritizer tests if the shape of parsed rawContents matches what's expected. combine learnings from both to create best storage approach
            if (rawContents) {
                return JSON.parse(rawContents) as IState;
            }
        },
        set: (state: ILocalState | ISessionState) => {
            // @ts-ignore
            storageSource.setItem(storageKey, JSON.stringify(state));
        },
        clear: () => {
            // @ts-ignore
            storageSource.removeItem(storageKey);
        }
    };

    return storageMethods;
};
