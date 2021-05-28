export const enableFormControls = () =>
    Array.from(window.document.querySelectorAll('[disabled]')).forEach(formControl => formControl.removeAttribute('disabled'));
