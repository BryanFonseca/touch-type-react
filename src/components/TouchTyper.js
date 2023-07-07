import ResetButton from "./ResetButton";
import Timer from "./Timer";
import TyperInput from "./TyperInput";
import WordsContainer from "./WordsContainer";

function TouchTyper() {
    return (
        <div className="touch-typer">
            <div className="touch-typer__top">
                <Timer />
                <WordsContainer>
                    {['hola ', 'como ', 'estas']}
                </WordsContainer>
            </div>
            <div className="touch-typer__bottom">
                <TyperInput />
                <ResetButton />
            </div>
        </div>
    );
}

export default TouchTyper;
