import { useState, useEffect } from "react";
import './pages.css';
import { createOrUpdateCharacter, getClasses, getRaces } from "../api/useApiSocket.js";

const CharacterCreation = () => {
    const [nextId, setNextId] = useState(2);
    const [name, setName] = useState("");
    const [hp, setHp] = useState(0);
    const [maxHp, setMaxHp] = useState(0);
    const [tempHp, setTempHp] = useState(0);
    const [classPoints, setClassPoints] = useState(0);
    const [maxClassPoints, setMaxClassPoints] = useState(0);
    const [race, setRace] = useState(0);
    const [characterClass, setCharacterClass] = useState(0);
    const [races, setRaces] = useState([]);
    const [classes, setClasses] = useState([]);
    function setHpandMaxHp(numberInput){
        setHp(numberInput);
        setMaxHp(numberInput);
    }
    function setClassPointsandMaxClassPoints(numberInput){
        setClassPoints(numberInput);
        setMaxClassPoints(numberInput);
    }
    useEffect(() => {(async () => {
            const arr = await getRaces();
            setRaces(arr);
        })();
    }, []);
    useEffect(() => {(async () => {
            const arr = await getClasses();
            setClasses(arr);
        })();
    }, []);
    return (
        <div>
            <form onSubmit={createOrUpdateCharacter({id: nextId, name, hp, maxHp, tempHp, classPoints, maxClassPoints, raceid: race, classid: characterClass})}>
        <div>Next id: <b>{nextId}</b></div>

        <div>
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
            <label>Max HP:</label>
            <input type="number" value={maxHp} onChange={(e) => setHpandMaxHp(Number(e.target.value))}/>
        </div>

        <div>
            <label>Max Class Points:</label>
            <input type="number" value={maxClassPoints} onChange={(e) => setClassPointsandMaxClassPoints(Number(e.target.value))}/>
        </div>
        <div>
            <label for="race">Race</label>
            <select id="race" name="race" onChange={(e) => setRace(Number(e.target.value))}>
                {races.map((race, index) => (
                    <option value={race.id} key={race.id}>{race.name}</option>
                ))}
            </select>
        </div>
        <div>
            <label for="class">Class</label>
            <select id="class" name="class" onChange={(e) => setCharacterClass(Number(e.target.value))}>
                {classes.map((Characterclass, index) => (
                    <option value={Characterclass.id} key={Characterclass.id}>{Characterclass.name}</option>
                ))}
            </select>
        </div>
        <button type="submit">Add character</button>
        </form>
        </div>
    );
};

export default CharacterCreation;