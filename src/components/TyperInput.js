import { useState } from "react";

function equalUntil(baseWord, otherWord) {
    for (let i = 0; i < baseWord.length; i++) {
        if (baseWord[i] !== otherWord[i]) return i;
    }
    return -1;
}

function TyperInput({ currentWord, onCorrectlyTyped, onType }) {
    const [typed, setTyped] = useState("");

    function handleType(e) {
        const charCount = e.target.value.length;
        const toCompare = currentWord.slice(0, charCount);
        console.log("To Compare:", toCompare);
        const equality = equalUntil(toCompare, e.target.value);
        const summary = {
            correctUntil: equality === -1 ? toCompare.length : equality,
            wrongUntil: equality !== -1 ? toCompare.length : 0,
        };
        summary.correctUntil--;
        summary.wrongUntil--;

        if (e.target.value.length > toCompare.length) {
            summary.wrongUntil = e.target.value.length - 1;
        }
        onType(summary);

        if (
            e.target.value.slice(0, e.target.value.length - 1) ===
                currentWord &&
            e.target.value.slice(e.target.value.length - 1) === " "
        ) {
            console.log("Correctly typed");
            onCorrectlyTyped();
            setTyped("");
            onType({}); // overrides the prev one
            return;
        }
        setTyped(e.target.value);
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
