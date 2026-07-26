import { useEffect, useState, React } from "react";
import { useParams } from "react-router-dom";
import './pages.css';
import characterSelection from '../assets/CharacterSelection.png'
import longRestButton from '../assets/LongRestButton.png'
import phone from '../assets/Phone.png'
import exampleSheet from '../assets/ExampleSheet.png'
import autopsy from '../assets/Autopsy.png'
import DynamicDebuffsTable from './dynamicTable.js'
import {getCharacterById, UpdateCharacter} from "../api/useApiSocket.js";

const CharacterSheet = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    useEffect(() => {
        (async () => {
            const arr = await getCharacterById(id);
            setCharacter(arr[0] ?? null);
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
    return (
        <div>
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
                                <h4>{character?.hp ?? '-'}</h4>
                                <button type="button" className="hpCounterUp, counter" onClick={() => changeCharacterHP(character.hp + 1)}>
                                        +
                                </button>
                            </div>
                        </div>
                        <div className = "row">
                            <div className="interactiveCounterBox">
                                <h3>Current Spell Points</h3>
                                <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints - 1)}>
                                        -
                                </button>
                                <h4>{character?.classPoints ?? '-'}</h4>
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
                                            <td><input className="checkbox" type="checkbox"></input></td>
                                            <td><input className="checkbox" type="checkbox"></input></td>
                                            <td><input className="checkbox" type="checkbox"></input></td>
                                        </tr>
                                        <tr>
                                            <td>Failures</td>
                                            <td><input className="checkbox" type="checkbox"></input></td>
                                            <td><input className="checkbox" type="checkbox"></input></td>
                                            <td><input className="checkbox" type="checkbox"></input></td>
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
    );
};

export default CharacterSheet;