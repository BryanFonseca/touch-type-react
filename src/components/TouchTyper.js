import { useCallback, useEffect, useRef, useState } from "react";
import ResetButton from "./ResetButton";
import Timer from "./Timer";
import TyperInput, { getSummary } from "./TyperInput";
import WordsContainer from "./WordsContainer";

function isInsideFirstLineArea(container, element) {
    const { top: elementTop } = element.getBoundingClientRect();
    const wordHeight = Number.parseFloat(
        window.getComputedStyle(element).height
    );
    const { top: areaTop } = container.getBoundingClientRect();
    const areaBottom = areaTop + wordHeight;
    return elementTop <= areaBottom;
}

// This considers 1word = 5 keystrokes
function calculateWpm(typedChars, initialSeconds) {
    const typedWordsCount = typedChars / 5;
    const wordsPerMinute = typedWordsCount / (initialSeconds / 60);
    return wordsPerMinute.toFixed(0);
}

function TouchTyper({ words, onReset, onFinish }) {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    // getSummary is used to initialize an object with the same structure for the first render
    const [typingDetails, setTypingDetails] = useState(getSummary("", ""));
    const [timerStarted, setTimerStarted] = useState(false);
    // Used for resetting the timer and text input
    const [resetKey, setResetKey] = useState(0);
    const wordsContainerRef = useRef();
    const currentWordRef = useRef();

    function handleNextWord() {
        setCurrentWordIndex((prev) => prev + 1);
    }

    function handleInitialKeystroke() {
        setTimerStarted(true);
    }

    function handleReset() {
        setTimerStarted(false);
        setResetKey(Math.random().toString());
        setCurrentWordIndex(0);
        setTypingDetails(getSummary("", ""));
        onReset();
    }

    const handleTimeout = useCallback(
        (initialTime) => {
            // curr.length + 1 bcs of the space between each word ;)
            const typedChars = words
                .slice(0, currentWordIndex)
                .reduce((prev, curr) => prev + curr.length + 1, 0);
            onFinish(calculateWpm(typedChars, initialTime));
        },
        [onFinish, currentWordIndex, words]
    );

    // auto-scrolling behavior
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

    // TODO: abstract away some of this logic
    const wordsElements = words.map((word, wordIdx) => (
        <span
            ref={wordIdx === currentWordIndex ? currentWordRef : null}
            className={`word 
                ${wordIdx === currentWordIndex ? "word--current" : ""} 
                ${wordIdx < currentWordIndex ? "word--passed" : ""}
            `}
            key={word + wordIdx}
        >
            {[...word].map((character, characterIdx) => (
                <span
                    className={`char 
                        ${
                            wordIdx === currentWordIndex &&
                            characterIdx <= typingDetails.correctUntil
                                ? "char--correct"
                                : ""
                        } 
                        ${
                            wordIdx === currentWordIndex &&
                            characterIdx > typingDetails.correctUntil &&
                            characterIdx <= typingDetails.wrongUntil
                                ? "char--wrong"
                                : ""
                        } 
                        ${
                            wordIdx === currentWordIndex &&
                            typingDetails.wrongUntil !== -1
                                ? "char--wrong"
                                : ""
                        }
                    `}
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
                <Timer
                    key={resetKey}
                    started={timerStarted}
                    initialTime={5}
                    onTimeout={handleTimeout}
                />
                <WordsContainer ref={wordsContainerRef}>
                    {wordsElements}
                </WordsContainer>
            </div>
            <div className="touch-typer__bottom">
                <TyperInput
                    key={resetKey}
                    currentWord={words.at(currentWordIndex)}
                    onCorrectlyTyped={handleNextWord}
                    onType={setTypingDetails}
                    onInitialKeystroke={handleInitialKeystroke}
                    onFinish={() => console.log("Finished")}
                    isLastWord={words.length - (currentWordIndex + 1) === 0}
                />
                <ResetButton onClick={handleReset} />
            </div>
        </div>
    );
}

export default TouchTyper;
