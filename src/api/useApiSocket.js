const apiUrl = "http://localhost:3001";

export const getCharacters = async () => {
  try {
    const res = await fetch(apiUrl + `/api/characters`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error(txt);
    }

    const charactersArray = await res.json();
    return charactersArray;
  } catch (err) {
    alert(`Network error: ${String(err)}`);
    return []; // important so callers get an array
  }
};

export function createOrUpdateCharacter({id, name, hp, maxHp, tempHp, spellPool, maxSpellPool}) {
  return async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + `/api/characters/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, hp, maxHp, tempHp, spellPool, maxSpellPool}),
    });

    if (!response.ok) {
      const txt = await response.text();
      alert(`Save failed: ${txt}`);
      return;
    }
    const data = await response.json();
    alert("Character Created!");
    }catch (err) {
      alert(`Network error: ${String(err)}`);
    }
  }
}