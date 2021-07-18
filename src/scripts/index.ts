import { populateExampleDiv } from "./populateExampleDiv";
import { restoreFromStorage, attachEventHandlers } from "./attachEventHandlers";
import { enableFormControls } from "./enableFormControls";
import { handleRuntimeError } from "./handleRuntimeError";
import { setState, state } from "./state";

try {
    populateExampleDiv();
    restoreFromStorage();
    attachEventHandlers();
    enableFormControls();
    setState(state);
} catch (error) {
    console.error(error);
    // TODO: what happens if a browser doesn't even support ES modules?? e.g. IE??
    handleRuntimeError(error);
}
