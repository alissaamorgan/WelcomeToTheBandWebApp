import {React, useState} from "react";
import './pages.css';
import characterSelection from '../assets/CharacterSelection.png'
import longRestButton from '../assets/LongRestButton.png'
import phone from '../assets/Phone.png'
import exampleSheet from '../assets/ExampleSheet.png'

const CharacterSheet = () => {
      const [count, setCount] = useState(0)

    return (
        <div>
        <div class="characterSheetHeader">
            <img class = "headerCharacterSelectionButton" src={characterSelection} alt="CharacterSelection" onClick={() => window.location = '/characterSelection'}></img>
            <img class = "headerLongRestButton" src={longRestButton} alt="LongRestButton" onClick={() => alert("Long Rest Taken!")}></img>
        </div>
        <div class="characterSheetPage">
            <div class="characterSheetPhone">
                <img class = "phone" src={phone} alt="Phone"></img>
            </div>
            <div class="characterSheetSheet">
                <div class="characterSheetModStats">
                    <div class="characterSheetHP, column">
                        <h3>Current Hit Points</h3>
                        <button type="button" className="hpCounterUp" onClick={() => setCount((count) => count + 1)}>
                                +
                        </button>
                        <h4>{count}</h4>
                        <button type="button" className="hpCounterDown" onClick={() => setCount((count) => count - 1)}>
                                -
                        </button>
                    </div>
                    <div class="column">
                            2
                    </div>
                    <div class="column">
                            3
                    </div>
                </div>
                <div class="characterSheet">
                    <img class = "sheet" src={exampleSheet} alt="Sheet"></img>
                </div>
            </div>
        </div>
        </div>
    );
};

export default CharacterSheet;