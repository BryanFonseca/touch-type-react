import { useEffect } from "react";

function Timer({ started }) {
    useEffect(() => {
        if (!started) return;
        const intervalId = setInterval(() => {
            console.log("tick");
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [started]);

    return (
        <input
            className="touch-typer__timer"
            type="text"
            value="1:00"
            onChange={() => {}}
        />
    );
}

export default Timer;
