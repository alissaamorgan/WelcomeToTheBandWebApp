import { useState } from "react";
import './pages.css';
import { createOrUpdateCharacter } from "../api/useApiSocket.js";

const CharacterCreation = () => {
    const [nextId, setNextId] = useState(1);
    const [name, setName] = useState("");
    const [hp, setHp] = useState(0);
    const [maxHp, setMaxHp] = useState(0);
    const [tempHp, setTempHp] = useState(0);
    const [classPoints, setClassPoints] = useState(0);
    const [maxClassPoints, setMaxClassPoints] = useState(0);

    function setHpandMaxHp(numberInput){
        setHp(numberInput);
        setMaxHp(numberInput);
    }

    function setClassPointsandMaxClassPoints(numberInput){
        setClassPoints(numberInput);
        setMaxClassPoints(numberInput);
    }

    return (
        <div>
            <form onSubmit={createOrUpdateCharacter({id: nextId, name, hp, maxHp, tempHp, classPoints, maxClassPoints})}>
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
            <label>Max Class Points:</label>
            <input type="number" value={maxClassPoints} onChange={(e) => setClassPointsandMaxClassPoints(Number(e.target.value))}/>
        </div>
        <button type="submit">Add character</button>
        </form>
        </div>
    );
};

export default CharacterCreation;