import { useEffect, useState } from "react";

function Timer({ started, initialTime, onTimeout }) {
    const [seconds, setSeconds] = useState(initialTime);

    useEffect(() => {
        if (!started) return;

        const intervalId = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds === 1) {
                    clearInterval(intervalId);
                    return 0;
                }
                return prevSeconds - 1;
            });
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, [started, initialTime]);

    useEffect(() => {
        if (seconds !== 0) return;
        onTimeout(initialTime);
    }, [seconds, onTimeout, initialTime]);

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
