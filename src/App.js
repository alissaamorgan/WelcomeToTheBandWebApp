// filename -App.js
import "./App.css";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home.js";
import CharacterCreation from "./pages/characterCreation.js";
import CharacterSelection from "./pages/characterSelection.js";
import CharacterSheet from "./pages/characterSheet.js";
import DmScreen from "./pages/dmScreen.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/characterCreation" element={<CharacterCreation />} />
                <Route path="/characterSelection" element={<CharacterSelection />} />
                <Route path="/characterSheet/:id" element={<CharacterSheet />} />
                <Route path="/dmScreen" element={<DmScreen />} />
            </Routes>
        </Router>
    );
}

export default App;