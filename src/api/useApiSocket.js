import { useEffect, useState } from "react";

export const getCharacters = async () => {
  try {
    const res = await fetch(`http://localhost:3001/api/characters`, {
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
