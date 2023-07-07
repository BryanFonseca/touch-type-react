function Score({ scored = 0 }) {
    return (
        <div className="score">
            <span className="score-phrase">You just hit</span>
            <div className="score-data">
                <span className="score-current">{scored}</span>
                <span className="score-wpm">WPM</span>
            </div>
        </div>
    );
}

export default Score;
