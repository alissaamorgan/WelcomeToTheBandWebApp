import {React, useState} from "react";
import './pages.css';

const CharacterSheet = () => {
      const [count, setCount] = useState(0)

    return (
        <div>
            <h1>CharacterSheet</h1>
            <button
                type="button"
                className="counter"
                color="green"
                onClick={() => setCount((count) => count + 1)}
                >
                    +
            </button>
            Count is {count}
            <button
                type="button"
                className="counter"
                color = "red"
                onClick={() => setCount((count) => count - 1)}
                >
                    -
            </button>
        </div>
    );
};

export default CharacterSheet;