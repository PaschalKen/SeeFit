import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Function to initialize the database connection
async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

// Initialize the database connection
const dbConn = init();

// Function to list all Hiits
export async function listHiits() {
  const db = await dbConn;
  return db.all('SELECT * FROM Hiits');
}

// Function to find a Hiit by its ID
export async function findHiit(id) {
  const db = await dbConn;
  return await db.get('SELECT * FROM Hiits WHERE id = ?', id);
}

// Function to add a new Hiit
export async function addHiit(hiit_id, name, description, type) {
  const db = await dbConn;
  return db.run('INSERT INTO Hiits (hiits_id, name, description, type) VALUES (?, ?, ?, ?)', [
    hiit_id,
    name,
    description,
    type,
  ]);
}

// Function to add a new Exercise
export async function addExercise(
  name,
  description,
  exercise_duration,
  rest_duration,
  hiit_id,
) {
  const db = await dbConn;
  return db.run(
    'INSERT INTO Exercise (name, description, exercise_duration, rest_duration, hiit_id) VALUES (?, ?, ?, ?, ?)',
    [name, description, exercise_duration, rest_duration, hiit_id],
  );
}

// Function to delete a Hiit by its ID
export async function deleteHiit(id) {
  const db = await dbConn;
  return db.run('DELETE FROM Hiits WHERE hiits_id = ?', id);
}

// Function to list all Exercises
export async function listExercises() {
  const db = await dbConn;
  return db.all('SELECT * FROM Exercise');
}
