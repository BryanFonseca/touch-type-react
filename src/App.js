import Score from "./components/Score";
import TouchTyper from "./components/TouchTyper";

function App() {
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

            <TouchTyper />
            <Score scored={3} />
        </main>
    );
}

export default App;
