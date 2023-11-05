import 'focus-visible';
import { attachEventHandlers } from "./attachEventHandlers";
import { enableFormControls } from "./enableFormControls";
import { handleRuntimeError } from "../../../scripts/handleRuntimeError";
import { setState, state } from "../../../scripts/state";
import { unorphan } from "../../../scripts/unorphan";

try {
    const unorphanOptions = {
        resize: true,
        throttleDelay: 250,
        onUnorphan: () => {
            /* TODO: automatically create voiceover accessible headings (AFTER unorphaning) */
        },
        force: false
    };
    unorphan(window.document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, li, th, td'), unorphanOptions);
    // TODO: commented out until I figure out a solution
    // restoreFromStorage();
    attachEventHandlers();
    enableFormControls();
    setState(state);
} catch (_error) {
    const error = _error as Error; // https://github.com/Microsoft/TypeScript/issues/20024
    console.error(error);
    // TODO: what happens if a browser doesn't even support ES modules?? e.g. IE??
    handleRuntimeError(error);
}
