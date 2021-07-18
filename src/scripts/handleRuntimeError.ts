import { setContent, createElement } from "./domInteraction";

export const handleRuntimeError = (error: Error) => {
    window.document.getElementById('js-error')!.removeAttribute('hidden');
    const errorMessage = createElement('code', { class: 'inline-code' }, error.message) as Element;
    setContent(window.document.getElementById('js-error-intro'), ['JavaScript failed to execute with the following error message: ', errorMessage]);
};
