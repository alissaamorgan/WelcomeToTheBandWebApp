const apiUrl = "http://localhost:3001";

export const getCharacters = async () => {
  try {
    const response = await fetch(apiUrl + `/api/getAllCharacters`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt);
      }
      const charactersArray = await response.json();
      return charactersArray;
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      return []; // important so callers get an array
  }
};

export async function getCharacterById(id) {
    try {
      const response = await fetch(apiUrl + `/api/getCharacter/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt);
      }
      return await response.json();
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      return []; // important so callers get an array
    }
}

export function createOrUpdateCharacter({id, name, hp, maxHp, tempHp,  classPoints, maxClassPoints}) {
  return async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + `/api/createOrUpdateCharacter/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, hp, maxHp, tempHp,  classPoints, maxClassPoints}),
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

export async function UpdateCharacter(character) {
  try {
    const response = await fetch(apiUrl + `/api/UpdateCharacter`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(character),
  });

  if (!response.ok) {
    const txt = await response.text();
    alert(`Save failed: ${txt}`);
    return;
  }
  }catch (err) {
    alert(`Network error: ${String(err)}`);
  }
}