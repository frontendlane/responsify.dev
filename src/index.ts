import * as ClipboardJS from 'clipboard';

// TODO: either get these from HTML or set HTML according to these (pros and cons??)
let property = 'width';
let unit = 'px';

const removeFormControls = () =>
    Array.from(window.document.querySelectorAll('[disabled]')).forEach(formControl => formControl.removeAttribute('disabled'));

const removeContent = (element: Element | null) => {
    while (element?.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const setElementContent = (element: Element | null, content: string | (string | Element | DocumentFragment)[]) => {
    removeContent(element);
    Array.isArray(content)
        ? element?.append(...content)
        : element?.append(content);
};

const setContent = (target: Element | Element[] | null, content: string | (string | Element | DocumentFragment)[]) =>
    Array.isArray(target)
        ? target.forEach(element => setElementContent(element, content))
        : setElementContent(target, content);

const handlePropertyNameChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    property = target.value;
    setContent(Array.from(window.document.querySelectorAll('#step-2-property-name, #step-2-property-unit, #step-4-property')), target.value);
};

const handleValueUnitChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    unit = target.value;
    setContent(window.document.getElementById('step-4-unit'), target.value);
    setContent(Array.from(window.document.querySelectorAll('#step-3-container, #step-5-container')), target.value === '%' ? 'Parent' : 'Viewport');
};

const getCalculationValues = () => {
    const elementLowerBoundValue = (window.document.getElementById('element-lower-bound-value') as HTMLInputElement | null)?.valueAsNumber;
    const containerLowerBound = (window.document.getElementById('container-lower-bound') as HTMLInputElement | null)?.valueAsNumber;
    const elementUpperBound = (window.document.getElementById('element-upper-bound-value') as HTMLInputElement | null)?.valueAsNumber;
    const containerUpperBound = (window.document.getElementById('container-upper-bound') as HTMLInputElement | null)?.valueAsNumber;

    // TODO: why can't this work: [elementLowerBoundValue, containerLowerBound, elementUpperBound, containerUpperBound].some(value => value === undefined)
    if (elementLowerBoundValue === undefined ||
        containerLowerBound === undefined ||
        elementUpperBound === undefined ||
        containerUpperBound === undefined
    ) {
        throw new Error('Not valid number(s)');
    }

    return {elementLowerBoundValue, containerLowerBound, elementUpperBound, containerUpperBound};
};

const removeLastCharacter = (word: string) => word.substring(0, word.length - 1);

const trimUnnecessaryDigits = (number: number) => {
    let numberAsString = number.toFixed(3);
    while (numberAsString.endsWith('0')) {
        numberAsString = removeLastCharacter(numberAsString);
    }
    if (numberAsString.endsWith('.')) {
        numberAsString = removeLastCharacter(numberAsString);
    }
    return +numberAsString;
};

const calculate = () => {
    const { elementLowerBoundValue, containerLowerBound, elementUpperBound, containerUpperBound } = getCalculationValues();

    const elementStartingsize = unit === 'px'
        ? elementLowerBoundValue
        : elementLowerBoundValue / 100 * containerLowerBound;
    const elementEndingsize = unit === 'px'
        ? elementUpperBound
        : elementUpperBound / 100 * containerUpperBound;
    const elementDiff = elementEndingsize - elementStartingsize;
    const containerDiff = containerUpperBound - containerLowerBound;
    const rate = elementDiff / containerDiff;
    const initial = elementStartingsize - (containerLowerBound * rate);
    const sign = rate < 0 ? '-' : '+';

    return {
        initial: trimUnnecessaryDigits(initial),
        sign,
        rate: trimUnnecessaryDigits(Math.abs(rate) * 100)
    };
};

const generate = () => {
    const {initial, sign, rate} = calculate();
    return `${property}: calc(${initial}px ${sign} ${rate}${unit === '%' ? '%' : 'vw'});`;
};

const generateAndRender = (event: Event) => {
    event.preventDefault();
    setContent(window.document.getElementById('result'), generate());
};

const clipboardSuccess = () => {
    const notification = window.document.getElementById('notification')
    setContent(notification, 'Copied');
    window.setTimeout(() => removeContent(notification), 5000);
};

const clipboardError = () => {
    const notification = window.document.getElementById('notification')
    const kbd = window.document.createElement('kbd')
    kbd.className = 'kbd';
    setContent(kbd, window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C');
    setContent(notification, ['Press ', kbd, ' to copy']);
    window.setTimeout(() => removeContent(notification), 5000);
};

const attachEventHandlers = () => {
    window.document.getElementById('css-property')?.addEventListener('change', handlePropertyNameChange);
    window.document.getElementById('element-value-unit')?.addEventListener('change', handleValueUnitChange);
    window.document.getElementById('form')?.addEventListener('submit', generateAndRender);

    const clipboard = new ClipboardJS('.button', { text: () =>  generate()});
    clipboard.on('success', clipboardSuccess);
    clipboard.on('error', clipboardError);
};

removeFormControls();
attachEventHandlers();
