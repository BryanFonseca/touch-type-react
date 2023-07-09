import { useState } from "react";

function equalUntil(baseWord, otherWord) {
    for (let i = 0; i < baseWord.length; i++) {
        if (baseWord[i] !== otherWord[i]) return i;
    }
    return -1;
}

/**
 * 
 * @param {*} typingWord 
 * @param {*} inputValue 
 */
function getSummary(typingWord, inputValue) {
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

function TyperInput({ currentWord, onCorrectlyTyped, onType }) {
    const [typed, setTyped] = useState("");

    function handleType(e) {
        const inputValue = e.target.value;
        const toCompare = currentWord.slice(0, inputValue.length);

        const inputNoLastChar = inputValue.slice(0, inputValue.length - 1);
        const inputLastChar = inputValue.slice(inputValue.length - 1);
        if (inputNoLastChar === currentWord && inputLastChar === " ") {
            onCorrectlyTyped();
            setTyped("");
            onType({});
            return;
        }

        onType(getSummary(toCompare, inputValue));
        setTyped(inputValue);
    }

    return (
        <input
            className="touch-typer__input"
            type="text"
            placeholder="type"
            autoFocus
            value={typed}
            onChange={handleType}
        />
    );
}

export default TyperInput;
