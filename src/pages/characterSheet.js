import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import './pages.css';
import characterSelection from '../assets/CharacterSelection.png'
import longRestButton from '../assets/LongRestButton.png'
import phone from '../assets/Phone.png'
import exampleSheet from '../assets/ExampleSheet.png'
import autopsy from '../assets/Autopsy.png'
import DynamicDebuffsTable from './dynamicTable.js'
import folder from '../assets/Folder.png'
import {getCharacterById, UpdateCharacter, getRaceById, getClassById} from "../api/useApiSocket.js";

const CharacterSheet = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [race, setRace] = useState(null);
    const [characterClass, setCharacterClass] = useState(null);
    useEffect(() => { (async () => {
            const arr = await getCharacterById(id);
            setCharacter(arr[0] ?? null);
            if(character){
                setRace(await getRaceById(character.raceid));
                setCharacterClass(await getClassById(character.classid));
            }
        })();
    }, []);
    function changeCharacterHP(value){
        setCharacter((prev) => {
            const next = {...prev, hp: value};
            UpdateCharacter(next);
            return next;
        });
    }
    function changeCharacterClassPoints(value){
        setCharacter((prev) => {
            const next = {...prev, classPoints: value};
            UpdateCharacter(next);
            return next;
        });
    }
    const toggleDeathCheckboxes = (key) => {
        return setCharacter((prev) => {
            const currentCheckStatus = prev?.[key] ?? 1; //default 1 if can't find
            const toggleCurrentStatus = currentCheckStatus === 1 ? 0 : 1; //if is 1, set to 0. else set to 1
            const next = {...prev, [key]: toggleCurrentStatus};
            UpdateCharacter(next);
            return next;
        });
    };
    return (
        <div>
            <div className="characterSheetMain">
                <div className="characterSheetName">{character?.name ?? 0}</div>
                <div className="characterSheetHeader">
                    <img className = "headerCharacterSelectionButton" src={characterSelection} alt="CharacterSelection" onClick={() => window.location = '/characterSelection'}></img>
                    <img className = "headerLongRestButton" src={longRestButton} alt="LongRestButton" onClick={() => alert("Long Rest Taken!")}></img>
                </div>
                <div className="characterSheetPage">
                    <div className="characterSheetPhone">
                        <img className = "phone" src={phone} alt="Phone"></img>
                    </div>
                    <div className="characterSheetSheet">
                        <div className="characterSheetModStats, table">
                            <div className="characterSheetAutopsy">
                                    <img className = "autopsyImage" src={autopsy} alt="Autposy"></img>
                            </div>
                            <div className="characterSheetInteractive">
                                <div className = "row">
                                    <div className="interactiveCounterBox">
                                        <h3>Current Hit Points</h3>
                                        <button type="button" className="hpCounterDown, counter" onClick={() => changeCharacterHP(character.hp - 1)}>
                                                -
                                        </button>
                                        <h4>{character?.hp ?? 0}</h4>
                                        <button type="button" className="hpCounterUp, counter" onClick={() => changeCharacterHP(character.hp + 1)}>
                                                +
                                        </button>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="interactiveCounterBox">
                                        <h3>Current Class Points</h3>
                                        <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints - 1)}>
                                                -
                                        </button>
                                        <h4>{character?.classPoints ?? 0}</h4>
                                        <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints + 1)}>
                                                +
                                        </button>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="interactiveCounterBox">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th colSpan="4"><h3>Death Saves</h3></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Successes</td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathS1 ?? 0} onChange={() => toggleDeathCheckboxes('deathS1')}></input></td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathS2 ?? 0} onChange={() => toggleDeathCheckboxes('deathS2')}></input></td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathS3 ?? 0} onChange={() => toggleDeathCheckboxes('deathS3')}></input></td>
                                                </tr>
                                                <tr>
                                                    <td>Failures</td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathF1 ?? 0} onChange={() => toggleDeathCheckboxes('deathF1')}></input></td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathF2 ?? 0} onChange={() => toggleDeathCheckboxes('deathF2')}></input></td>
                                                    <td><input className="checkbox" type="checkbox" 
                                                        checked={character?.deathF3 ?? 0} onChange={() => toggleDeathCheckboxes('deathF3')}></input></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div className="characterSheetDebuffs">
                                <DynamicDebuffsTable/>
                            </div>
                        </div>
                        <div className="characterSheet">
                            <img className = "sheet" src={exampleSheet} alt="Sheet"></img>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSheet;