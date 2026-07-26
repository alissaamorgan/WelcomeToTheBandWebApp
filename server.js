import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { WebSocketServer } from "ws";
import { open } from "sqlite";

const app = express();
app.use(cors());
app.use(express.json());

const db = await open({
  filename: "./app.db",
  driver: sqlite3.Database,
});

await db.exec(`
  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    hp INTEGER NOT NULL,
    maxHp INTEGER NOT NULL,
    tempHp INTEGER NOT NULL,
    spellPool INTEGER NOT NULL,
    maxSpellPool INTEGER NOT NULL
  );
`);

const server = app.listen(3001, () => {
  console.log("API on http://localhost:3001");
});

const wss = new WebSocketServer({ server });
const wsClients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  ws.on("close", () => clients.delete(ws));

  // send current data immediately to new client
  broadcastItems();
});

function toCharacter(characterRow){
    return {
      id: characterRow.id,
      name: characterRow.name,
      hp: characterRow.hp,
      maxHp: characterRow.maxHp,
      tempHp: characterRow.tempHp,
      spellPool: characterRow.spellPool,
      maxSpellPool: characterRow.maxSpellPool
  };
}

async function getCharacters() {
  const rows = await db.all("SELECT * FROM characters ORDER BY id;");
  return rows.map(toCharacter);
}

async function broadcastCharacters() {
  const characters = await getCharacters();
  const payload = JSON.stringify({ type: "characters_updated", characters });

  for (const ws of wsClients) {
    if (ws.readyState === ws.OPEN) ws.send(payload);
  }
}

app.get("/api/characters", async (_req, res) => {
  res.json(await getCharacters());
});

app.post("/api/characters/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, hp, maxHp, tempHp, spellPool, maxSpellPool} = req.body;

  console.log({ id, name, hp, maxHp, tempHp, spellPool, maxSpellPool });


  await db.run(
    `
    INSERT INTO characters (id, name, hp, maxHp, tempHp, spellPool, maxSpellPool)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      hp=excluded.hp,
      maxHp=excluded.maxHp,
      tempHp=excluded.tempHp,
      spellPool=excluded.spellPool,
      maxSpellPool=excluded.maxSpellPool
    `,
    [id, name, hp, maxHp, tempHp, spellPool, maxSpellPool]
  );

  await broadcastCharacters?.();
  res.json({ ok: true });
});
