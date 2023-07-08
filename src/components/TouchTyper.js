import { useState } from "react";
import ResetButton from "./ResetButton";
import Timer from "./Timer";
import TyperInput from "./TyperInput";
import WordsContainer from "./WordsContainer";

function TouchTyper() {
    const [typed, setTyped] = useState("");
    return (
        <div className="touch-typer">
            <div className="touch-typer__top">
                <Timer />
                <WordsContainer>{["hola ", "como ", "estas"]}</WordsContainer>
            </div>
            <div className="touch-typer__bottom">
                <TyperInput value={typed} onType={setTyped} />
                <ResetButton />
            </div>
        </div>
    );
}

export default TouchTyper;
