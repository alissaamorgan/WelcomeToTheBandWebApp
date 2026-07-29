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
  CREATE TABLE IF NOT EXISTS race (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    strengthBonus BOOLEAN DEFAULT 0 NOT NULL,
    dexterityBonus BOOLEAN DEFAULT 0 NOT NULL,
    constitutionBonus BOOLEAN DEFAULT 0 NOT NULL,
    intelligenceBonus BOOLEAN DEFAULT 0 NOT NULL,
    wisdomBonus BOOLEAN DEFAULT 0 NOT NULL,
    charismaBonus BOOLEAN DEFAULT 0 NOT NULL,
    savingThrowProficency TEXT
  );

  CREATE TABLE IF NOT EXISTS class (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    hitDice INTEGER DEFAULT 0 NOT NULL,
    classPointName TEXT
  );

  CREATE TABLE IF NOT EXISTS characters (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    raceid INTEGER,
    classid INTEGER,
    hp INTEGER NOT NULL,
    maxHp INTEGER NOT NULL,
    tempHp INTEGER DEFAULT 0 NOT NULL,
    classPoints INTEGER NOT NULL,
    maxClassPoints INTEGER NOT NULL,
    deathS1 BOOLEAN DEFAULT 0 NOT NULL,
    deathS2 BOOLEAN DEFAULT 0 NOT NULL,
    deathS3 BOOLEAN DEFAULT 0 NOT NULL,
    deathF1 BOOLEAN DEFAULT 0 NOT NULL,
    deathF2 BOOLEAN DEFAULT 0 NOT NULL,
    deathF3 BOOLEAN DEFAULT 0 NOT NULL,
    strength INTEGER DEFAULT 0 NOT NULL,
    dexterity INTEGER DEFAULT 0 NOT NULL,
    constitution INTEGER DEFAULT 0 NOT NULL,
    intelligence INTEGER DEFAULT 0 NOT NULL,
    wisdom INTEGER DEFAULT 0 NOT NULL,
    charisma INTEGER DEFAULT 0 NOT NULL,
    instrumentOrGenre TEXT DEFAULT "-" NOT NULL,
    FOREIGN KEY (raceid) REFERENCES race(id),
    FOREIGN KEY (classid) REFERENCES class(id)
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
      raceid: characterRow.raceid,
      classid: characterRow.classid,
      hp: characterRow.hp,
      maxHp: characterRow.maxHp,
      tempHp: characterRow.tempHp,
      classPoints: characterRow.classPoints,
      maxClassPoints: characterRow.maxClassPoints,
      deathS1: characterRow.deathS1,
      deathS2: characterRow.deathS2,
      deathS3: characterRow.deathS3,
      deathF1: characterRow.deathF1,
      deathF2: characterRow.deathF2,
      deathF3: characterRow.deathF3,
      strength: characterRow.strength,
      dexterity: characterRow.dexterity,
      constitution: characterRow.constitution,
      intelligence: characterRow.intelligence,
      wisdom: characterRow.wisdom,
      charisma: characterRow.charisma,
      instrumentOrGenre: characterRow.instrumentOrGenre
  };
}

async function getCharacters() {
  const rows = await db.all("SELECT * FROM characters ORDER BY id;");
  return rows.map(toCharacter);
}

async function getCharacterById(id) {
  const rows = await db.all("SELECT * FROM characters WHERE id = ?", id);
  return rows.map(toCharacter);
}

async function broadcastCharacters() {
  const characters = await getCharacters();
  const payload = JSON.stringify({ type: "characters_updated", characters });

  for (const ws of wsClients) {
    if (ws.readyState === ws.OPEN) ws.send(payload);
  }
}

function toRace(raceRow){
    return {
      id: raceRow.id,
      name: raceRow.name,
      strengthBonus: raceRow.strengthBonus,
      dexterityBonus: raceRow.dexterityBonus,
      constitutionBonus: raceRow.constitutionBonus,
      intelligenceBonus: raceRow.intelligenceBonus,
      wisdomBonus: raceRow.wisdomBonus,
      charismaBonus: raceRow.charismaBonus,
      savingThrowProficency: raceRow.savingThrowProficency
  };
}

async function getRaces() {
  const rows = await db.all("SELECT * FROM race ORDER BY id;");
  return rows.map(toRace);
}

async function getRaceById(id) {
  const rows = await db.all("SELECT * FROM race WHERE id = ?", id);
  return rows.map(toRace);
}

function toClass(classRow){
    return {
      id: classRow.id,
      name: classRow.name,
      hitDice: classRow.hitDice,
      classPointName: classRow.ClassPointName
  };
}

async function getClasses() {
  const rows = await db.all("SELECT * FROM class ORDER BY id;");
  return rows.map(toClass);
}

async function getClassById(id) {
  const rows = await db.all("SELECT * FROM class WHERE id = ?", id);
  return rows.map(toClass);
}

app.get("/api/getAllCharacters", async (_req, res) => {
  res.json(await getCharacters());
});

app.get("/api/getCharacter/:id", async (req, res) => {
  const id = Number(req.params.id);
  res.json(await getCharacterById(id));
});

app.post("/api/createOrUpdateCharacter/:id", async (req, res) => {
  const id = Number(req.params.id);
  const { name, hp, maxHp, tempHp, classPoints, maxClassPoints, raceid, classid} = req.body;

  console.log({ id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, raceid, classid });


  await db.run(
    `
    INSERT INTO characters (id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, raceid, classid)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      hp=excluded.hp,
      maxHp=excluded.maxHp,
      tempHp=excluded.tempHp,
      classPoints=excluded.classPoints,
      maxClassPoints=excluded.maxClassPoints,
      raceid=excluded.raceid,
      classid=excluded.classid
    `,
    [id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, raceid, classid]
  );

  await broadcastCharacters?.();
  res.json({ ok: true });
});

app.post("/api/UpdateCharacter", async (req, res) => {
  const { id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, deathS1, deathS2, deathS3, deathF1, deathF2, deathF3} = req.body;
  console.log({ id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, deathS1, deathS2, deathS3, deathF1, deathF2, deathF3 });
  await db.run(
    `
    INSERT INTO characters (id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, deathS1, deathS2, deathS3, deathF1, deathF2, deathF3)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      name=excluded.name,
      hp=excluded.hp,
      maxHp=excluded.maxHp,
      tempHp=excluded.tempHp,
      classPoints=excluded.classPoints,
      maxClassPoints=excluded.maxClassPoints,
      deathS1=excluded.deathS1, 
      deathS2=excluded.deathS2, 
      deathS3=excluded.deathS3, 
      deathF1=excluded.deathF1, 
      deathF2=excluded.deathF2, 
      deathF3=excluded.deathF3
    `,
    [id, name, hp, maxHp, tempHp, classPoints, maxClassPoints, deathS1, deathS2, deathS3, deathF1, deathF2, deathF3]
  );

  await broadcastCharacters?.();
  res.json({ ok: true });
});

app.get("/api/getAllRaces", async (_req, res) => {
  res.json(await getRaces());
});

app.get("/api/getRace/:id", async (req, res) => {
  const id = Number(req.params.id);
  res.json(await getRaceById(id));
});

app.get("/api/getAllClasses", async (_req, res) => {
  res.json(await getClasses());
});

app.get("/api/getClass/:id", async (req, res) => {
  const id = Number(req.params.id);
  res.json(await getClassById(id));
});