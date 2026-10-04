import { useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import './pages.css';
import characterSelection from '../assets/CharacterSelection.png';
import longRestButton from '../assets/LongRestButton.png';
import autopsy from '../assets/Autopsy.png';
import papercorner from '../assets/Embeleshmets/Papercorner.png';
import paperclip from '../assets/Embeleshmets/Paperclip.png';
import tape from '../assets/Embeleshmets/Tape.png';
import {DynamicDebuffsTable, PhoneRender} from './dynamicTable.js';
import folderTab from '../assets/FolderTab.png';
import {getCharacterById, UpdateCharacter, getRaceById, getClassById, getNotificationByCharacterId} from "../api/useApiSocket.js";

const CharacterSheet = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [race, setRace] = useState(null);
    const [characterClass, setCharacterClass] = useState(null);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => { (async () => {
        if(id){
            const fetchCharacter = await getCharacterById(id);
            console.log(fetchCharacter);
            setCharacter(fetchCharacter);
            if(fetchCharacter.raceid){
                const fetchRace = await getRaceById(fetchCharacter.raceid);
                console.log(fetchRace);
                setRace(fetchRace);
            } else{
                console.log("No Race Id Provided");
            }
            if(fetchCharacter.classid){
                const fetchClass = await getClassById(fetchCharacter.classid);
                console.log(fetchClass);
                setCharacterClass(fetchClass);
            } else{
                console.log("No Class Id Provided");
            }
            const fetchNotifications = await getNotificationByCharacterId(id);
            if(fetchNotifications != []){
                setNotifications(fetchNotifications);
                console.log(fetchNotifications);
            }
        }else{
            console.log("No Character Id Provided");
        }
            
        })();
    }, [id]);

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
    function rollDice(numberOfDice, diceSides){
        let diceRolled = 0;
        for (let i = 0; i < numberOfDice; i++) {
            let dice = Math.floor(Math.random() * diceSides) + 1;
            diceRolled += dice;
        }
        return diceRolled;
    }
    function longRest(){
        let rolledHP = rollDice(6, 6);
        let currentHP = character?.hp ?? 0;
        let newHP = currentHP + rolledHP;
        let maxHP = character?.maxHp ?? 0;
        console.log("Rolled HP: " + rolledHP);
        let checkedHP = newHP > maxHP? maxHP : newHP;
        let resetClassPoints = character?.maxClassPoints ?? 0;
        setCharacter((prev) => {
            const next = {...prev, classPoints: resetClassPoints, hp: checkedHP, deathS1: 0, deathS2: 0, deathS3: 0, deathF1: 0, deathF2: 0, deathF3: 0};
            UpdateCharacter(next);
            return next;
        });
    }
    return (
        <div>
            <div className="characterSheetMain">
                <div className="characterSheetName">{character?.name ?? 0}</div>
                <div className="characterSheetHeader">
                    <img className = "headerFolderTab" src={folderTab} alt="FolderTab"></img>
                    <img className = "headerCharacterSelectionButton" src={characterSelection} alt="CharacterSelection" onClick={() => window.location = '/characterSelection'}></img>
                    <img className = "headerLongRestButton" src={longRestButton} alt="LongRestButton" onClick={() => longRest()}></img>
                </div>
                <div className="characterSheetPage">
                    <PhoneRender notifications = {notifications} phoneCase = {character?.phoneCase ?? 0} phoneBackground = {character?.phoneBackground ?? 0}></PhoneRender>
                    <div className="characterSheetSheet">
                        <div className="characterSheetModStats, table" >
                            <div className="characterSheetAutopsy" >
                                    <img className = "toppc" src={papercorner} alt="Autposy" ></img>
                                    <img className = "btmpc" src={papercorner} alt="btmpc"></img>
                                    <img className = "autopsyImage" src={autopsy} alt="Autposy"></img>
                            </div>
                            <div className="characterSheetInteractive">
                                <div className="interactiveCounterBox">
                                    <h3>Current Hit Points</h3>
                                    <button type="button" className="counter" onClick={() => changeCharacterHP(character.hp - 1)}>
                                            -
                                    </button>
                                    <h4>{character?.hp ?? 0}</h4>
                                    <button type="button" className="counter" onClick={() => changeCharacterHP(character.hp + 1)}>
                                            +
                                    </button>
                                </div>
                                <div className="interactiveCounterBox">
                                    <h3>{characterClass?.classPointName ?? "Class Points"}</h3>
                                    <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints - 1)}>
                                            -
                                    </button>
                                    <h4>{character?.classPoints ?? 0}</h4>
                                    <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints + 1)}>
                                            +
                                    </button>
                                </div>
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
                            <div className="characterSheetDebuffs">
                                <DynamicDebuffsTable/>
                            </div>
                        </div>
                        <div className="characterSheet">
                             <iframe className="sheetIframe" width="100%" height="600" frameborder="0" title="embeddedSheet"
                                src={"https://docs.google.com/spreadsheets/d/e/" + character?.characterSheetUrl + "/pubhtml?widget=false&headers=false&chrome=false"}>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CharacterSheet;