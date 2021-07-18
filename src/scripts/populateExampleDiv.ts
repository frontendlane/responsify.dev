import { setContent, createElement } from "./domInteraction";

const showCssWidths = () => {
    if (window.innerWidth < 900) {
        return 'width: 100%;';
    } else if (window.innerWidth >= 900 && window.innerWidth < 1000) {
        return 'width: calc(6300px - 600%);';
    } else {
        return 'width: 30%;';
    }
};

const calcDivWidth = () => {
    if (window.innerWidth < 900) {
        return window.innerWidth;
    } else if (window.innerWidth >= 900 && window.innerWidth < 1000) {
        return Math.round(6300 - 6 * window.innerWidth);
    } else {
        return Math.round(window.innerWidth * .3);
    }
};

export const populateExampleDiv = () => {
    const exampleDiv = window.document.getElementById('example-div');
    exampleDiv && setContent(exampleDiv, [
        // @ts-ignore
        createElement('code', { class: 'inline-code' }, showCssWidths()),
        // @ts-ignore
        createElement('code', { class: 'inline-code' }, `window.innerWidth === ${window.innerWidth}`),
        // @ts-ignore
        createElement('code', { class: 'inline-code' }, `div.offsetWidth === ${calcDivWidth()}`),
    ]);
};
