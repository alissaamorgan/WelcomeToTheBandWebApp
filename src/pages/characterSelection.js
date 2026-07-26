import { useEffect, useState, React } from "react";
import './pages.css';
import {getCharacters} from "../api/useApiSocket.js";


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
            <h1>Character Selection</h1>
             <ul>
                {characters.map((character) => (
                <li key={character.id}>{character.name}, maxHp: {character.maxHp}, HP: {character.hp}, 
                MaxSpellPool: {character.maxSpellPool}, SpellPool: {character.spellPool}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterSelection;