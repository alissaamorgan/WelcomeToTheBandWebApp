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
import DmScreenTimeManager from "./pages/dmScreenTimeManager.js";
import DmScreenPlayerManager from "./pages/dmScreenPlayerManager.js";
import DmScreenCombatManager from "./pages/dmScreenCombatManager.js";
import DmScreenShopManager from "./pages/dmScreenShopManager.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/characterCreation" element={<CharacterCreation />} />
                <Route path="/characterSelection" element={<CharacterSelection />} />
                <Route path="/characterSheet/:id" element={<CharacterSheet />} />
                <Route path="/dmScreenTimeManager" element={<DmScreenTimeManager />} />
                <Route path="/dmScreenPlayerManager" element={<DmScreenPlayerManager />} />
                <Route path="/dmScreen" element={<DmScreenPlayerManager />} />
                <Route path="/dmScreenCombatManager" element={<DmScreenCombatManager/>}/>
                <Route path="/dmScreenShopManager" element={<DmScreenShopManager/>}/>
            </Routes>
        </Router>
    );
}

export default App;