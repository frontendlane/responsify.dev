const relativeTos = {
    parent: '%',
    viewport: 'vw'
};
let relativeTo = relativeTos.parent;

const unit = {
    starting: 'fixed',
    ending: 'fixed'
};

const removeLastCharacter = (word) => word.substring(0, word.length - 1);

const trimUnnecessaryDigits = (number) => {
    let numberAsString = number.toFixed(3);
    while (numberAsString.endsWith('0')) {
        numberAsString = removeLastCharacter(numberAsString);
    }
    if (numberAsString.endsWith('.')) {
        numberAsString = removeLastCharacter(numberAsString);
    }
    return +numberAsString;
};

const removeContent = element => {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
};

const setContent = (element, content) => {
    removeContent(element);
    element.append(content);
};

const calculateLinearFunction = () => {
    const elementStartingsize = unit.starting === 'fixed'
        ? document.getElementById('element-starting-size').valueAsNumber
        : document.getElementById('element-starting-size').valueAsNumber / 100 * document.getElementById('container-starting-size').valueAsNumber;
    const elementEndingsize = unit.ending === 'fixed'
        ? document.getElementById('element-ending-size').valueAsNumber
        : document.getElementById('element-ending-size').valueAsNumber / 100 * document.getElementById('container-ending-size').valueAsNumber;
    const elementDiff = elementEndingsize - elementStartingsize;
    const containerDiff = document.getElementById('container-ending-size').valueAsNumber - document.getElementById('container-starting-size').valueAsNumber;
    const rate = elementDiff / containerDiff;
    const initial = elementStartingsize - (document.getElementById('container-starting-size').valueAsNumber * rate);
    const sign = rate < 0 ? '-' : '+';
    
    const calc = `calc(${trimUnnecessaryDigits(initial)}px ${sign} ${trimUnnecessaryDigits(Math.abs(rate) * 100)}${relativeTo})`
    const code = document.createElement('code');
    code.append(`width: ${calc};`);
    setContent(document.querySelector('output'), code);
};

const handleChangeUnit = (event) => {
    const identifier = event.target.closest('div').id.includes('start') ? 'starting' : 'ending';
    unit[identifier] = event.target.value;
};

const handleRelativeToChange = (event) => {
    [...document.querySelectorAll('fieldset > label > span')].filter(span => span.textContent === relativeTo).forEach(input => input.setAttribute('hidden', ''));
    relativeTo = relativeTos[event.target.value];
    [...document.querySelectorAll('fieldset > label > span')].filter(span => span.textContent === relativeTo).forEach(input => input.removeAttribute('hidden'));
};

const copyToClipboard = () => navigator.clipboard.writeText(document.querySelector('output').textContent);

const attachEventHandlers = () => {
    document.getElementById('element-starting-size').addEventListener('input', calculateLinearFunction);
    document.querySelector('#cell-element-start > fieldset').addEventListener('change', handleChangeUnit);
    document.getElementById('element-ending-size').addEventListener('input', calculateLinearFunction);
    document.querySelector('#cell-element-end > fieldset').addEventListener('change', handleChangeUnit);
    document.querySelector('#row-heading-container > fieldset').addEventListener('change', handleRelativeToChange);
    document.getElementById('container-starting-size').addEventListener('input', calculateLinearFunction);
    document.getElementById('container-ending-size').addEventListener('input', calculateLinearFunction);
    document.querySelector('form').addEventListener('change', calculateLinearFunction);
    document.querySelector('button').addEventListener('click', copyToClipboard);
};

attachEventHandlers();
calculateLinearFunction();