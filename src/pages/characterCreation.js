import { useEffect, useState } from "react";
import './pages.css';
import { useApiSocket } from "../api/useApiSocket.js";

const CharacterCreation = () => {
    const [nextId, setNextId] = useState(1);
    const [name, setName] = useState("");
    const [hp, setHp] = useState(0);
    const [maxHp, setMaxHp] = useState(0);
    const [tempHp, setTempHp] = useState(0);
    const [spellPool, setSpellPool] = useState(0);
    const [maxSpellPool, setMaxSpellPool] = useState(0);

    async function handleSubmit(e) {

        const id = nextId;

        const res = await fetch(`http://localhost:3001/api/characters/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({name, hp, maxHp, tempHp, spellPool, maxSpellPool}),
        });

        if (!res.ok) {
            const txt = await res.text();
            alert(`Save failed: ${txt}`);
        return;
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
        <div>Next id: <b>{nextId}</b></div>

        <div>
            <label>Name:</label>
            <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
            <label>HP:</label>
            <input
            type="number"
            value={hp}
            onChange={(e) => setHp(Number(e.target.value))}
            />
        </div>

        <div>
            <label>spellPool:</label>
            <input
            type="number"
            value={spellPool}
            onChange={(e) => setSpellPool(Number(e.target.value))}
            />
        </div>
        <button type="submit">Add character</button>
        </form>
        </div>
    );
};

export default CharacterCreation;