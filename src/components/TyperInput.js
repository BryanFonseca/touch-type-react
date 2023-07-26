import { useState } from "react";

function equalUntil(baseWord, otherWord) {
    for (let i = 0; i < baseWord.length; i++) {
        if (baseWord[i] !== otherWord[i]) return i;
    }
    return -1;
}

/**
 * Returns a summary object that indicates up until which 
 * index a word is correctly and incorrectly typed.
 * @param {*} typingWord 
 * @param {*} inputValue 
 */
export function getSummary(typingWord, inputValue) {
    const equality = equalUntil(typingWord, inputValue);
    const summary = {
        correctUntil: equality === -1 ? typingWord.length : equality,
        wrongUntil: equality !== -1 ? typingWord.length : 0,
    };
    summary.correctUntil--;
    summary.wrongUntil--;

    if (inputValue.length > typingWord.length)
        summary.wrongUntil = inputValue.length - 1;

    return summary;
}

function TyperInput({ currentWord, onCorrectlyTyped, onType, onInitialKeystroke }) {
    const [typed, setTyped] = useState("");
    const [isFirstKeystroke, setIsFirstKeystroke] = useState(true);

    function handleType(e) {
        const inputValue = e.target.value;
        const toCompare = currentWord.slice(0, inputValue.length);

        const inputNoLastChar = inputValue.slice(0, inputValue.length - 1);
        const inputLastChar = inputValue.slice(inputValue.length - 1);
        if (inputNoLastChar === currentWord && inputLastChar === " ") {
            onCorrectlyTyped();
            setTyped("");
            // getSummary is used to initialize an object with the same structure
            // to keep a consistent interface. A class would be a good fit for this 
            // but also a bit overkill
            onType(getSummary('', ''));
            return;
        }

        onType(getSummary(toCompare, inputValue));
        setTyped(inputValue);
    }

    function checkInitialKeystroke(fn) {
        return function(...args) {
            if (isFirstKeystroke) {
                onInitialKeystroke();
                setIsFirstKeystroke(false);
            }
            fn.call(null, ...args);
        }
    }

    return (
        <input
            className="touch-typer__input"
            type="text"
            placeholder="type"
            autoFocus
            value={typed}
            onChange={checkInitialKeystroke(handleType)}
        />
    );
}

export default TyperInput;
