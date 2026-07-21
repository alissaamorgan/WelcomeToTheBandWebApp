// filename -App.js

import React from "react";
import "./App.css";
//import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home";
import CharacterCreation from "./pages/characterCreation";
import CharacterSelection from "./pages/characterSelection";
import CharacterSheet from "./pages/characterSheet";
import Blogs from "./pages/blogs";
import SignUp from "./pages/signup";

function App() {
    return (
        <Router>
            {/*<Navbar /> */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/characterCreation" element={<CharacterCreation />} />
                <Route path="/characterSelection" element={<CharacterSelection />} />
                <Route path="/characterSheet" element={<CharacterSheet />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/sign-up" element={<SignUp />} />
            </Routes>
        </Router>
    );
}

export default App;