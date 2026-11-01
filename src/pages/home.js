import React from "react";
import './pages.css';

const Home = () => {
    return (
        <div class="homeimage">
            <div class = "homeButtons">
                <button className="HeaderButton homeOptions" onClick={() => window.location = '/characterSelection'}>CHARACTER SELECTION</button>
                <button className="HeaderButton homeOptions" onClick={() => window.location = '/characterCreation'}>CHARACTER CREATOR</button>
            </div>
                    
        </div>
    );
};

export default Home;