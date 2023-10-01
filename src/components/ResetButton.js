function ResetButton({onClick}) {
    return (
        <button onClick={onClick} className="touch-typer__reset-button">
            <ion-icon name="refresh-outline"></ion-icon>
        </button>
    );
}

export default ResetButton;
