import { attachEventHandlers } from "./attachEventHandlers";
import { enableFormControls } from "./enableFormControls";

try {
    attachEventHandlers();
    enableFormControls();
} catch (error) {
    console.error(error);
    window.document.getElementById('js-error')?.removeAttribute('hidden');
}
