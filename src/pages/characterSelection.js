import { useEffect, useState, React } from "react";
import './pages.css';
import {getCharacters} from "../api/useApiSocket.js";
import folder from '../assets/Folder.png'
import characterCreator from '../assets/CharacterCreator.png'


const CharacterSelection = () => {
    const [characters, setCharacters] = useState([]);
    useEffect(() => {
        (async () => {
            const arr = await getCharacters();
            setCharacters(arr);
        })();
        }, []);
    return (
        <div>
            <div className="characterSheetHeader">
                <img className = "headerCharacterSelectionButton" src={characterCreator} alt="CharacterCreation" onClick={() => window.location = '/characterCreation'}></img>
            </div>
            <div className="characterSelectionBody">
                {characters.map((character, index) => (
                    <div className = "characterSelectionFolder" key={character.id} style={{ '--i': index }}>
                        <h2 className="characterSelectionName">{character.name}</h2>
                        <img className = "characterSelectionFolderImage" src={folder} alt="characterSelectionFolderImage" onClick={() => window.location = '/characterSheet/' + character.id}></img>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterSelection;