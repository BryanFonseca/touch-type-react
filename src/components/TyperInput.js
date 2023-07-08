function TyperInput({ value, onType }) {
    return (
        <input
            className="touch-typer__input"
            type="text"
            placeholder="type"
            autofocus
            value={value}
            onChange={(e) => onType(e.target.value)}
        />
    );
}

export default TyperInput;
