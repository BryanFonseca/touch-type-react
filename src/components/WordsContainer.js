import { forwardRef } from "react";

const WordsContainer = forwardRef(function ({ children }, ref) {
    return (
        <div className="touch-typer__text-container">
            <div ref={ref} className="touch-typer__text">{children}</div>
        </div>
    );
});

export default WordsContainer;
