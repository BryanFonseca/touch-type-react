import { useState } from "react";
import ResetButton from "./ResetButton";
import Timer from "./Timer";
import TyperInput from "./TyperInput";
import WordsContainer from "./WordsContainer";

const words = [
    "hola",
    "como",
    "estas",
    "estas",
    "yo",
    "estoy",
    "muy",
    "bien",
    "de",
    "nada",
];

function TouchTyper() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typingDetails, setTypingDetails] = useState({});

    function handleNextWord() {
        setCurrentWordIndex((prev) => prev + 1);
    }

    const wordsElements = words.map((word, wordIdx) => (
        <span
            className={`word ${
                wordIdx === currentWordIndex ? "word--current" : ""
            }`}
            key={word + wordIdx}
        >
            {[...word].map((character, characterIdx) => (
                <span
                    className={`char ${
                        wordIdx === currentWordIndex &&
                        characterIdx <= typingDetails.correctUntil
                            ? "char--correct"
                            : ""
                    } ${
                        wordIdx === currentWordIndex &&
                        characterIdx > typingDetails.correctUntil &&
                        characterIdx <= typingDetails.wrongUntil
                            ? "char--wrong"
                            : ""
                    }`}
                    key={character + characterIdx}
                >
                    {character}
                </span>
            ))}
        </span>
    ));

    return (
        <div className="touch-typer">
            <div className="touch-typer__top">
                <Timer />
                <WordsContainer>{wordsElements}</WordsContainer>
            </div>
            <div className="touch-typer__bottom">
                <TyperInput
                    currentWord={words.at(currentWordIndex)}
                    onCorrectlyTyped={handleNextWord}
                    onType={setTypingDetails}
                />
                <ResetButton />
            </div>
        </div>
    );
}

export default TouchTyper;
