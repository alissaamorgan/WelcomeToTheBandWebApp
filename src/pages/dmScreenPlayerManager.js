import { useEffect, useState} from "react";
import './pages.css';
import {getCharacters, UpdateCharacter, getClassById, getNotificationByCharacterId} from "../api/useApiSocket.js";
import DynamicDebuffsTable from './dynamicTable.js';
import phoneNotification from '../assets/Notification.png';

const DmScreenPlayerManager = () => {
    const [characters, setCharacters] = useState([]);
    const bandInventory = [
        { title: "Item 1", description: 'Description'},
        { title: "Item 2", description: 'Description'}
    ];
    const [character, setCharacter] = useState(null);
    const [characterClass, setCharacterClass] = useState(null);
    const [notifications, setNotifications] = useState([]);
    useEffect(() => {
        (async () => {
            const arr = await getCharacters();
            setCharacters(arr);
            const fetchCharacter = arr[0];
            setCharacter(fetchCharacter);
            if (fetchCharacter.id){
                const fetchNotifications = await getNotificationByCharacterId(fetchCharacter.id);
                if(fetchNotifications != []){
                    setNotifications(fetchNotifications);
                    console.log(fetchNotifications);
                }
            }
            if(fetchCharacter.classid){
                const fetchClass = await getClassById(fetchCharacter.classid);
                console.log(fetchClass);
                setCharacterClass(fetchClass);
            } else{
                console.log("No Class Id Provided");
            }
            
        })();
    }, []);

    async function selectCharacter(){
        const index = document.getElementById("playerManagerSelect").value;
        const fetchCharacter = characters[index];
        setCharacter(characters[index]);
        if (fetchCharacter.id){
            const fetchNotifications = await getNotificationByCharacterId(fetchCharacter.id);
            if(fetchNotifications != []){
                setNotifications(fetchNotifications);
                console.log(fetchNotifications);
            }
        }
    }
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
            <div className="characterSheetHeader">

            </div>
            <div className="playerManagerPage">
                <div className="playerManagerBandInformation">
                    <div>Band Information</div>
                    <div>Total Fans: </div>
                    <div>Band Level: </div>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="2"><h3>Band Inventory</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            {bandInventory.map((bandItem, index) => {
                                return(
                                    <tr key={index}>
                                        <td key={bandItem.title}>{bandItem.title}</td>
                                        <td key={bandItem.description}>{bandItem.description}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className="playerManagerPlayerForm">
                    <select className="playerManagerPlayerFormTitle" id = "playerManagerSelect" onClick={() => selectCharacter()}>
                        {characters.map((character, index) => (
                            <option className = "playerManagerCharacterSelection" key={character.id} value={index}>
                                {character.name}
                            </option>
                        ))}
                    </select>
                    <div>
                         <div className="playerManagerInteractive">
                            <div className = "row">
                                    <div className="interactiveCounterBox">
                                        <h3>Current Hit Points</h3>
                                        <div className="interactiveCounterBoxData">
                                            <button type="button" className="counter" onClick={() => changeCharacterHP(character.hp - 1)}>
                                                    -
                                            </button>
                                            <h4>{character?.hp ?? 0}</h4>
                                            <button type="button" className="counter" onClick={() => changeCharacterHP(character.hp + 1)}>
                                                    +
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className = "row">
                                    <div className="interactiveCounterBox">
                                        <h3>{characterClass?.classPointName ?? "Class Points"}</h3>
                                        <div className="interactiveCounterBoxData">
                                            <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints - 1)}>
                                                    -
                                            </button>
                                            <h4>{character?.classPoints ?? 0}</h4>
                                            <button type="button" className="counter" onClick={() => changeCharacterClassPoints(character.classPoints + 1)}>
                                                    +
                                            </button>
                                        </div>
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
                            <div className="playerManagerNotificationContainer">
                                {notifications.map((notification) => (
                                    <div className = "playerManagerNotification" key={notification.id}>
                                        <div className="playerManagerNotificationText">
                                            <div className="playerManagerNotificationApp">{notification.app}</div>
                                            <div className="playerManagerNotificationTitle">{notification.title}</div>
                                            <div className="playerManagerNotificationMessage">{notification.message}</div>
                                        </div>
                                        <img className = "playerManagerNotificationImage" src={phoneNotification} alt="phoneNotificationImage"></img>
                                    </div>
                                ))}
                            </div>
                        </div>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default DmScreenPlayerManager;