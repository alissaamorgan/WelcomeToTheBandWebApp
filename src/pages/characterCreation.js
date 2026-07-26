import { useEffect, useState } from "react";
import './pages.css';
import { createOrUpdateCharacter } from "../api/useApiSocket.js";

const CharacterCreation = () => {
    const [nextId, setNextId] = useState(1);
    const [name, setName] = useState("");
    const [hp, setHp] = useState(0);
    const [maxHp, setMaxHp] = useState(0);
    const [tempHp, setTempHp] = useState(0);
    const [spellPool, setSpellPool] = useState(0);
    const [maxSpellPool, setMaxSpellPool] = useState(0);

    function setHpandMaxHp(numberInput){
        setHp(numberInput);
        setMaxHp(numberInput);
    }

    function setSpellPoolandMaxSpellPool(numberInput){
        setSpellPool(numberInput);
        setMaxSpellPool(numberInput);
    }

    return (
        <div>
            <form onSubmit={createOrUpdateCharacter({id: nextId, name, hp, maxHp, tempHp, spellPool, maxSpellPool})}>
        <div>Next id: <b>{nextId}</b></div>

        <div>
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
            <label>Max HP:</label>
            <input type="number" value={maxHp} onChange={(e) => setHpandMaxHp(Number(e.target.value))}/>
        </div>

        <div>
            <label>Max Spell Pool:</label>
            <input type="number" value={maxSpellPool} onChange={(e) => setSpellPoolandMaxSpellPool(Number(e.target.value))}/>
        </div>
        <button type="submit">Add character</button>
        </form>
        </div>
    );
};

export default CharacterCreation;