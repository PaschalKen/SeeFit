import * as hb from './hiitboard.js';

import express from 'express';

import * as url from 'url';

const app = express();

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

app.use(express.static('client', { extensions: ['html'] }));

async function getHiits(req, res) {
  try {
    const hiits = await hb.listHiits();
    res.json(hiits);
  } catch (error) {
    console.error('Error fetching hiits:', error);
    res.status(500).send('Internal Server Error');
  }
}

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

async function getExercise(req, res) {
  try {
    res.json(await hb.listExercises());
  } catch (error) {
    console.error('Error fetching exercises:', error);
  }
}

async function handleDeleteHiit(req, res) {
  try {
    await hb.deleteHiit(req.params.id);
    res.status(204).send('will delete');
  } catch (error) {
    console.error('Error deleting hiit:', error);
  }
}

app.delete('/hiits/:id', handleDeleteHiit);
app.get('/hiits', getHiits);
app.post('/hiits', express.json(), postHiit);
app.post('/exercise', express.json(), postExercise);
app.get('/exercise', getExercise);
app.get('/app/*/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

const port = 8080;

app.listen(port, () => {
  console.log(`Server listening on Port:${port}`);
});
