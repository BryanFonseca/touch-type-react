import { useState } from "react";
import Score from "./components/Score";
import TouchTyper from "./components/TouchTyper";

function shuffle(array) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        const randomIndex = Math.floor(Math.random() * array.length);
        const randomElement = array[randomIndex];
        array[i] = randomElement;
        array[randomIndex] = element;
    }
    // shallow copy is good enough for this
    return [...array];
}

const wordsDB = ['hola', 'bien', 'mal', 'como', 'estás', 'amigo', 'hermano', 'usar'];

function App() {
    const [lastHighScore, setLastHighScore] = useState(0);
    const [words, setWords] = useState(shuffle(wordsDB));

    return (
        <main className="app-container">
            {/* corner-github */}
            <div className="corner-left">
                <div className="github-profile-triangle"></div>
                <a
                    className="github-profile-button"
                    href="https://github.com/BryanFonseca"
                >
                    <ion-icon name="logo-github"></ion-icon>
                </a>
            </div>
            {/* corner-info */}
            <div className="corner-right">
                <button className="info-button">
                    <ion-icon name="information-outline"></ion-icon>
                </button>
            </div>

            <TouchTyper
                words={words}
                onReset={() => setWords(shuffle(wordsDB))}
                onFinish={setLastHighScore}
            />
            <Score scored={lastHighScore} />
        </main>
    );
}

export default App;
