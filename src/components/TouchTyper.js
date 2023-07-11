import { useEffect, useRef, useState } from "react";
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

function isInsideFirstLineArea(container, element) {
    const { top: elementTop } = element.getBoundingClientRect();
    const wordHeight = Number.parseFloat(
        window.getComputedStyle(element).height
    );
    const { top: areaTop } = container.getBoundingClientRect();
    const areaBottom = areaTop + wordHeight;
    return elementTop <= areaBottom;
}

function TouchTyper() {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [typingDetails, setTypingDetails] = useState({});
    const wordsContainerRef = useRef();
    const currentWordRef = useRef();

    function handleNextWord() {
        setCurrentWordIndex((prev) => prev + 1);
    }

    useEffect(() => {
        const { current: currentWordElement } = currentWordRef;
        const { current: wordsContainerElement } = wordsContainerRef;
        if (!currentWordElement) return;
        if (!isInsideFirstLineArea(wordsContainerElement, currentWordElement)) {
            const wordHeight = Number.parseFloat(
                getComputedStyle(currentWordElement).height
            );
            const wordMarginTop = Number.parseFloat(
                getComputedStyle(currentWordElement).marginTop
            );
            wordsContainerElement.scrollBy({
                top: wordHeight + wordMarginTop * 2,
                behavior: "smooth",
            });
        }
    }, [currentWordIndex]);

    const wordsElements = words.map((word, wordIdx) => (
        <span
            ref={wordIdx === currentWordIndex ? currentWordRef : null}
            className={`word ${
                wordIdx === currentWordIndex ? "word--current" : ""
            } ${wordIdx < currentWordIndex ? "word--passed" : ""}`}
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
                <WordsContainer ref={wordsContainerRef}>
                    {wordsElements}
                </WordsContainer>
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
