// filename -App.js

import React from "react";
import "./App.css";
//import Navbar from "./components/Navbar";
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/home.js";
import CharacterCreation from "./pages/characterCreation.js";
import CharacterSelection from "./pages/characterSelection.js";
import CharacterSheet from "./pages/characterSheet.js";
import Blogs from "./pages/blogs.js";
import SignUp from "./pages/signup.js";

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