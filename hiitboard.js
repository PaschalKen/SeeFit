import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

const dbConn = init();

export async function listHiits() {
  const db = await dbConn;
  return db.all('SELECT * FROM Hiits');
}

export async function findHiit(id) {
  const db = await dbConn;
  return await db.get('SELECT * FROM Hiits WHERE id = ?', id);
}

export async function addHiit(hiitId, name, description, type) {
  const db = await dbConn;
  return db.run('INSERT INTO Hiits (hiits_id, name, description, type) VALUES (?, ?, ?, ?)', [
    hiitId,
    name,
    description,
    type,
  ]);
}

export async function addExercise(
  name,
  description,
  exerciseDuration,
  restDuration,
  hiitId,
) {
  const db = await dbConn;
  return db.run(
    'INSERT INTO Exercise (name, description, exercise_duration, rest_duration, hiit_id) VALUES (?, ?, ?, ?, ?)',
    [name, description, exerciseDuration, restDuration, hiitId],
  );
}

export async function deleteHiit(id) {
  const db = await dbConn;
  return db.run('DELETE FROM Hiits WHERE hiits_id = ?', id);
}

export async function listExercises() {
  const db = await dbConn;
  return db.all('SELECT * FROM Exercise');
}
