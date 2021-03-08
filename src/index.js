import ClipboardJS from 'clipboard';

console.log('ClipboardJS', ClipboardJS);

let property = 'padding-left';
let unit = 'px';

const removeFormControls = () =>
    Array.from(document.querySelectorAll('[disabled]')).forEach(formControl => formControl.removeAttribute('disabled'));

const removeContent = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const setElementContent = (element, content) => {
    removeContent(element);
    element.append(content);
};

const setContent = (target, content) => Array.isArray(target) || target instanceof NodeList
    ? Array.from(target).forEach(element => setElementContent(element, content))
    : setElementContent(target, content);

const handlePropertyNameChange = event => {
    property = event.target.value;
    setContent(window.document.querySelectorAll('#step-2-property-name, #step-2-property-unit, #step-4-property'), event.target.value);
};

const handleValueUnitChange = event => {
    unit = event.target.value;
    setContent(window.document.getElementById('step-4-unit'), event.target.value);
    setContent(window.document.querySelectorAll('#step-3-container, #step-5-container'), event.target.value === '%' ? 'Parent' : 'Viewport');
};

const getCalculationValues = () => {
    const elementLowerBoundValue = document.getElementById('element-lower-bound-value').valueAsNumber;
    const containerLowerBound = document.getElementById('container-lower-bound').valueAsNumber;
    const elementUpperBound = document.getElementById('element-upper-bound-value').valueAsNumber;
    const containerUpperBound = document.getElementById('container-upper-bound').valueAsNumber;
    return {elementLowerBoundValue, containerLowerBound, elementUpperBound, containerUpperBound};
};

const removeLastCharacter = word => word.substring(0, word.length - 1);

const trimUnnecessaryDigits = number => {
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

const generateAndCopy = event => {
    event.preventDefault();
    const {initial, sign, rate} = calculate();
    const cssRule = `${property}: calc(${initial}px ${sign} ${rate}${unit === '%' ? '%' : 'vw'});`;
    setContent(document.querySelector('output code'), cssRule);
    navigator.clipboard.writeText(cssRule);
};

const attachEventHandlers = () => {
    window.document.getElementById('css-property')?.addEventListener('change', handlePropertyNameChange);
    window.document.getElementById('element-value-unit')?.addEventListener('change', handleValueUnitChange);
    document.querySelector('form').addEventListener('submit', generateAndCopy);
};

removeFormControls();
attachEventHandlers();
