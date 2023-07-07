function WordsContainer({ children }) {
    return (
        <div className="touch-typer__text-container">
            <div className="touch-typer__text">{children}</div>
        </div>
    );
}

export default WordsContainer;
