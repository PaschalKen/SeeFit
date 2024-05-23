import * as hb from './hiitboard.js';
import express from 'express';
import * as url from 'url';

// Creating an instance of the Express application
const app = express();

// Getting the current directory path
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Serving static files from the 'client' directory with '.html' extension
app.use(express.static('client', { extensions: ['html'] }));

// Handler function to get all hiits
async function getHiits(req, res) {
  try {
    const hiits = await hb.listHiits();
    res.json(hiits);
  } catch (error) {
    console.error('Error fetching hiits:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Handler function to add a new hiit
async function postHiit(req, res) {
  try {
    const hiit = await hb.addHiit(
      req.body.hiit_id,
      req.body.name,
      req.body.description,
      req.body.type,
    );
    res.json(hiit);
  } catch (error) {
    console.error('Error adding hiit:', error);
  }
}

// Handler function to add a new exercise
async function postExercise(req, res) {
  try {
    const exercise = await hb.addExercise(
      req.body.name,
      req.body.description,
      req.body.exercise_duration,
      req.body.rest_duration,
      req.body.hiit_id,
    );
    res.json(exercise);
  } catch (error) {
    console.error('Error adding exercise:', error);
  }
}

// Handler function to get all exercises
async function getExercise(req, res) {
  try {
    res.json(await hb.listExercises());
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

// Handler function to delete a hiit
async function handleDeleteHiit(req, res) {
  try {
    await hb.deleteHiit(req.params.id);
    res.status(204).send('will delete');
  } catch (error) {
    console.error('Error deleting hiit:', error);
  }
}

// Registering the delete route for hiits
app.delete('/hiits/:id', handleDeleteHiit);

// Registering the get route for hiits
app.get('/hiits', getHiits);

// Registering the post route for hiits
app.post('/hiits', express.json(), postHiit);

// Registering the post route for exercises
app.post('/exercise', express.json(), postExercise);

// Registering the get route for exercises
app.get('/exercise', getExercise);

// Serving the index.html file for all other routes under '/app/'
app.get('/app/*/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

// Setting the port number
const port = 8080;

// Starting the server
app.listen(port, () => {
  console.log(`Server listening on Port:${port}`);
});
