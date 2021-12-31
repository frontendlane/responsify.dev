import { WHITE_SPACE, NON_BREAKING_SPACE } from './constants';
import { setContent, removeContent } from './domInteraction';

interface ITags {
    [key: number]: string;
}

interface IOptions {
    resize?: boolean,
    throttleDelay?: number,
    onUnorphan?: () => void,
    force?: boolean
}

const isLastSpaceRegularWhiteSpace = (text: string) => text.lastIndexOf(WHITE_SPACE) > text.lastIndexOf(NON_BREAKING_SPACE);

const isUnorphanable = (text: string) => {
    const deserializedText = text.split('');
    for (let i = 0; i < deserializedText.length - 2; i++) {
        if (deserializedText[i] !== WHITE_SPACE && deserializedText[i + 1] == WHITE_SPACE && deserializedText[i + 2] !== WHITE_SPACE) {
            return true;
        }
    }
    return false;
};

const extractTags = (html: string) => {
    let textContent = html;
    const tags: ITags = {};
    for (let i = 0; i < html.length; i++) {
        if (html[i] === '<') {
            const openingBracketIndex = i;
            let closingBracketIndex: number | undefined;
            for (let j = openingBracketIndex; j < html.length; j++) {
                if (html[j] === '>') {
                    closingBracketIndex = j + 1;
                    break;
                }
            }
            if (!closingBracketIndex) {
                throw new Error('Malformed HTML.');
            }
            tags[openingBracketIndex] = html.substring(openingBracketIndex, closingBracketIndex);
        }
    }

    Object.entries(tags).reverse().forEach(([openingBracketIndex, tag]) => textContent = `${textContent.slice(0, +openingBracketIndex)}${textContent.slice(+openingBracketIndex + tag.length)}`);

    return { textContent, tags };
};

const depositTags = (unorphanedTextContent: string, tags: ITags) => {
    let innerHTML = unorphanedTextContent;
    Object.entries(tags).forEach(([openingBracketIndex, text]) => innerHTML = `${innerHTML.slice(0, +openingBracketIndex)}${text}${innerHTML.slice(+openingBracketIndex)}`);
    return innerHTML;
};

const unorphanChildrenfullHTML = (element: Element) => {
    const { textContent, tags } = extractTags(element.innerHTML);

    const deserializedTextContent = textContent.split('');
    let unorphanedTextContent;
    for (let i = deserializedTextContent.length - 1; i >= 0; i--) {
        if (deserializedTextContent[i] !== WHITE_SPACE && deserializedTextContent[i - 1] === WHITE_SPACE && deserializedTextContent[i - 2] !== WHITE_SPACE) {
            unorphanedTextContent = `${textContent.substring(0, i - 1)}${NON_BREAKING_SPACE}${textContent.substring(i)}`;
            break;
        }
    }

    if (!unorphanedTextContent) {
        throw new Error('Could not find where to replace regular white space with non-breaking space.');
    }

    return {
        unorphanedTextContent,
        unorphanedInnerHTML: depositTags(unorphanedTextContent, tags),
    };
};

const unorphanChildrenlessHTML = (element: Element) => {
    const textContent = element.textContent as string;
    const lastWhiteSpacePosition = textContent.lastIndexOf(WHITE_SPACE);
    const unorphanedTextContent = `${textContent.substring(0, lastWhiteSpacePosition)}${NON_BREAKING_SPACE}${textContent.substring(lastWhiteSpacePosition + 1)}`;

    return {
        unorphanedTextContent,
        unorphanedInnerHTML: unorphanedTextContent
    };
};

const getWords = (unorphanedTextContent: string) => {
    const deserializedTextContent = unorphanedTextContent.trim().split(WHITE_SPACE);
    // TODO: why is || necessary??
    const unorphanedWords = deserializedTextContent.pop()  || '';
    const otherWords = deserializedTextContent.join(WHITE_SPACE);
    return { unorphanedWords, otherWords };
};

const areUnorphanedWordsShorterThanHalfParentContentWidth = (element: Element, unorphanedWords: string) => {
    const parent = element.cloneNode(true) as Element;
    parent.removeAttribute('id');
    const parentHtmlElement = parent as HTMLElement;
    if (parentHtmlElement.style) {
        // TODO: do a screen shot comparison with and without and decide then
        parentHtmlElement.style.width = `${element.getBoundingClientRect().width}px`;
    }
    setContent(window.document.getElementById('offscreen-reveal'), parent);
    const parentContentWidth = parent.getBoundingClientRect().width - +window.getComputedStyle(parent).paddingLeft.split('px')[0] - +window.getComputedStyle(parent).paddingRight.split('px')[0];
    removeContent(window.document.getElementById('offscreen-reveal'));

    const textContainer = element.cloneNode(true) as Element;
    parent.removeAttribute('id');
    setContent(textContainer, unorphanedWords);
    setContent(window.document.getElementById('offscreen-nowrap'), textContainer);
    const textContainerWidth = textContainer.getBoundingClientRect().width;
    removeContent(window.document.getElementById('offscreen-nowrap'));

    return textContainerWidth < parentContentWidth / 2;
};

const areUnorphanedWordsShorterThanOtherWords = (unorphanedWords: string, otherWords: string) => unorphanedWords.length < otherWords.length;

const replaceLastWhiteSpaceWithNbsp = (element: Element, options: IOptions) => {
    const trimmedTextContent = element.textContent?.trim();

    if (trimmedTextContent?.includes(WHITE_SPACE) && isLastSpaceRegularWhiteSpace(trimmedTextContent) && isUnorphanable(trimmedTextContent)) {
        // TODO: if there is only one character before period, white space, emoji then add another &nbsp; in place of the previous white space
        const { unorphanedInnerHTML, unorphanedTextContent } = element.innerHTML.includes('<') ? unorphanChildrenfullHTML(element) : unorphanChildrenlessHTML(element);
        const { unorphanedWords, otherWords } = getWords(unorphanedTextContent);

        // TODO: use this to write tests
        // console.log({unorphanedInnerHTML, unorphanedTextContent, unorphanedWords, otherWords, areShorterParent: areUnorphanedWordsShorterThanHalfParentContentWidth(element, unorphanedWords), areShorterOther: areUnorphanedWordsShorterThanOtherWords(unorphanedWords, otherWords)});
        if (options.force) {
            element.innerHTML = unorphanedInnerHTML;
        } else if (areUnorphanedWordsShorterThanHalfParentContentWidth(element, unorphanedWords)) {
            if (otherWords) {
                if (areUnorphanedWordsShorterThanOtherWords(unorphanedWords, otherWords)) {
                    element.innerHTML = unorphanedInnerHTML;
                } else {
                    // TODO: is this the best way to organize this code??
                    // DO NOTHING
                }
            } else {
                element.innerHTML = unorphanedInnerHTML;
            }
        }
    }
};

const defaultOptions = {
    resize: false,
    throttleDelay: undefined,
    onUnorphan: undefined,
    force: false
};

export const unorphan = (target: Element | Element[] | NodeListOf<Element> | null, options: IOptions = defaultOptions) => {
    if (target === null) {
        return;
    }

    if (target instanceof window.Element) {
        replaceLastWhiteSpaceWithNbsp(target, options)
    } else {
        Array.from(target).reverse().forEach(element => replaceLastWhiteSpaceWithNbsp(element, options));
    }

    options.onUnorphan && options.onUnorphan();

    if (options.resize) {
        const throttleDelay = options.throttleDelay || 500;

        let lastUnorphaningTimestamp: number | undefined;
        const handleResize = () => {
            const now = new Date().getTime();
            if (!lastUnorphaningTimestamp || ((now - lastUnorphaningTimestamp) > throttleDelay)) {
                const recursiveOptions = Object.assign({}, options)
                delete recursiveOptions.resize;
                unorphan(target, recursiveOptions);
                lastUnorphaningTimestamp = now;
            }
            window.setTimeout(() => handleResize, throttleDelay);
        };
        window.addEventListener('resize', handleResize);

        return handleResize;
    }
};
