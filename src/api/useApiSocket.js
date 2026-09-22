const apiUrl = "http://localhost:3001";

export async function StartClock() {
  try {
    const response = await fetch(apiUrl + `/api/fake-clock/start`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
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

export async function StopClock() {
  try {
    const response = await fetch(apiUrl + `/api/fake-clock/stop`, {
      method: "POST",
      headers: { "Content-Type": "application/json" }
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

export function createOrUpdateCharacter({id, name, hp, maxHp, tempHp,  classPoints, maxClassPoints, raceid, classid}) {
  return async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(apiUrl + `/api/createOrUpdateCharacter/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({name, hp, maxHp, tempHp,  classPoints, maxClassPoints, raceid, classid}),
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
export const getRaces = async () => {
  try {
    const response = await fetch(apiUrl + `/api/getAllRaces`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt);
      }
      const racesArray = await response.json();
      return racesArray;
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      return []; // important so callers get an array
  }
};

export async function getRaceById(id) {
    try {
      const response = await fetch(apiUrl + `/api/getRace/${id}`, {
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

export const getClasses = async () => {
  try {
    const response = await fetch(apiUrl + `/api/getAllClasses`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt);
      }
      const classesArray = await response.json();
      return classesArray;
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      return []; // important so callers get an array
  }
};

export async function getClassById(id) {
    try {
      const response = await fetch(apiUrl + `/api/getClass/${id}`, {
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

export const getNotifications = async () => {
  try {
    const response = await fetch(apiUrl + `/api/getAllNotifications`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
      if (!response.ok) {
        const txt = await response.text();
        throw new Error(txt);
      }
      const classesArray = await response.json();
      return classesArray;
    } catch (err) {
      alert(`Network error: ${String(err)}`);
      return []; // important so callers get an array
  }
};

export async function getNotificationByCharacterId(characterid) {
    try {
      const response = await fetch(apiUrl + `/api/getNotificationByCharacterId/${characterid}`, {
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