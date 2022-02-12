import { setContent, createElement } from "./domInteraction";

const loadRuntimeErrorStyles = () => {
    const link = createElement('link', { rel: 'stylesheet', href: './public/pages/index/index.runtime-error.css' })
    // @ts-ignore
    window.document.head.append(link);
};

export const handleRuntimeError = (error: Error) => {
    loadRuntimeErrorStyles();
    window.document.getElementById('js-error')!.removeAttribute('hidden');
    // TODO: put back disabled attributes
    const errorMessage = createElement('code', { class: 'inline-code' }, error.message) as Element;
    setContent(window.document.getElementById('js-error-intro'), ['JavaScript failed to execute with the following error message: ', errorMessage]);
};
