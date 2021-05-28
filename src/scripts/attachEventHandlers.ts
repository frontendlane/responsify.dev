import * as ClipboardJS from 'clipboard';

// TODO: either get these from HTML or set HTML according to these (pros and cons??) | generating a calc() value can happen (but shouldn't??) even when CSS property field is " " (empty space)
// it's better to read the state of the HTML because that way I take advantage of Firefox remembering previous state
let property = 'width';
let unit = 'px';
let shouldIncludeComment = true;

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
    setContent(Array.from(window.document.querySelectorAll('#step-2-property-name, #step-2-property-unit, #step-4-property')), property);
};

const handleValueUnitChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    unit = target.value;
    setContent(window.document.getElementById('step-4-unit'), target.value);
    setContent(Array.from(window.document.querySelectorAll('#step-3-container, #step-5-container')), target.value === '%' ? 'Parent' : 'Viewport');
};

const handleCheckboxToggle = (event: Event) => {
    const target = event.target as HTMLInputElement;
    shouldIncludeComment = target.checked;
};

const getCalculationValues = () => {
    const elementLowerBound = (window.document.getElementById('element-lower-bound-value') as HTMLInputElement | null)?.valueAsNumber;
    const containerLowerBound = (window.document.getElementById('container-lower-bound') as HTMLInputElement | null)?.valueAsNumber;
    const elementUpperBound = (window.document.getElementById('element-upper-bound-value') as HTMLInputElement | null)?.valueAsNumber;
    const containerUpperBound = (window.document.getElementById('container-upper-bound') as HTMLInputElement | null)?.valueAsNumber;

    // TODO: why can't this work: // if ([elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound].includes(undefined)) {
    if (elementLowerBound === undefined ||
        containerLowerBound === undefined ||
        elementUpperBound === undefined ||
        containerUpperBound === undefined
    ) {
        throw new Error('Not valid number(s)');
    }

    return { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound };
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
    const { elementLowerBound, containerLowerBound, elementUpperBound, containerUpperBound } = getCalculationValues();

    const elementStartingSize = unit === 'px'
        ? elementLowerBound
        : elementLowerBound / 100 * containerLowerBound;
    const elementEndingSize = unit === 'px'
        ? elementUpperBound
        : elementUpperBound / 100 * containerUpperBound;
    const elementDiff = elementEndingSize - elementStartingSize;
    const containerDiff = containerUpperBound - containerLowerBound;
    const rate = elementDiff / containerDiff;
    const initial = elementStartingSize - (containerLowerBound * rate);
    const sign = rate < 0 ? '-' : '+';

    return {
        containerLowerBound,
        containerUpperBound,
        elementLowerBound,
        elementUpperBound,
        initial: trimUnnecessaryDigits(initial),
        sign,
        rate: trimUnnecessaryDigits(Math.abs(rate) * 100)
    };
};

const generate = () => {
    const {
        containerLowerBound,
        containerUpperBound,
        elementLowerBound,
        elementUpperBound,
        initial,
        sign,
        rate
    } = calculate();
    return `${property}: calc(${initial}px ${sign} ${rate}${unit === '%' ? '%' : 'vw'});${shouldIncludeComment ? ` /* ${unit === '%' ? 'parent' : 'viewport'} lower bound:${containerLowerBound}px; ${unit === '%' ? 'parent' : 'viewport'} upper bound: ${containerUpperBound}px; element lower bound: ${elementLowerBound}${unit}; element upper bound: ${elementUpperBound}${unit}; */` : ''}`;
};

const generateAndRender = (event: Event) => {
    event.preventDefault();
    setContent(window.document.getElementById('result'), generate());
    document.getElementById('clipboard-button')?.click();
    window.document.getElementById('result-container')?.focus();
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
    // TODO: what about mobile users?? for them indicate that the text is selected?? (is it) and that they need to copy
    setContent(kbd, window.navigator.userAgent.toLowerCase().includes('mac') ? '⌘C' : 'Control + C');
    setContent(notification, ['Press ', kbd, ' to copy']);
    window.setTimeout(() => removeContent(notification), 5000);
};

export const attachEventHandlers = () => {
    window.document.getElementById('css-property')?.addEventListener('change', handlePropertyNameChange);
    window.document.getElementById('element-value-unit')?.addEventListener('change', handleValueUnitChange);
    window.document.getElementById('checkbox')?.addEventListener('change', handleCheckboxToggle);
    window.document.getElementById('form')?.addEventListener('submit', generateAndRender);

    const clipboard = new ClipboardJS('#clipboard-button', { text: () =>  generate() });
    clipboard.on('success', clipboardSuccess);
    clipboard.on('error', clipboardError);
};
