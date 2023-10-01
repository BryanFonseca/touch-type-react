import { useState } from "react";
import Score from "./components/Score";
import TouchTyper from "./components/TouchTyper";

function App() {
    const [lastHighScore, setLastHighScore] = useState(0);
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

            <TouchTyper onFinish={setLastHighScore} />
            <Score scored={lastHighScore} />
        </main>
    );
}

export default App;
