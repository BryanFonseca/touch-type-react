import { useEffect, useState } from "react";

function Timer({ started, initialTime, onTimeout }) {
    const [seconds, setSeconds] = useState(initialTime);

    useEffect(() => {
        console.log('effect')
        if (!started) return;
        const timeoutId = setTimeout(() => {
            if (seconds === 0) return;
            if (seconds === 1) onTimeout(initialTime);
            setSeconds(prevSeconds => prevSeconds - 1);
        }, 1000);
        return () => {
            clearTimeout(timeoutId);
        };
    }, [started, initialTime, seconds, onTimeout]);

    return (
        // Implement double binding for hot time replacement
        <input
            className="touch-typer__timer"
            type="text"
            value={formatTime(seconds)}
            onChange={() => {}}
        />
    );
}

function formatTime(seconds) {
    const minute = String(Math.floor(seconds / 60));
    const second = String(seconds % 60).padStart(2, "0");
    const timeText = minute + ":" + second;
    return timeText;
}

export default Timer;
