import React from "react";
import './pages.css';
import characterSelection from '../assets/CharacterSelection.png'
import characterCreator from '../assets/CharacterCreator.png'

const Home = () => {
    return (
        <div class="homeimage">
            <div class = "homeButtons">
                <img class = "homeOptions" src={characterSelection} alt="CharacterSelection" onClick={() => window.location = '/characterSelection'}
                ></img>
                <img class = "homeOptions" src={characterCreator} alt="CharacterSelection" onClick={() => window.location = '/characterCreation'}
                ></img>
            </div>
                    
        </div>
    );
};

export default Home;