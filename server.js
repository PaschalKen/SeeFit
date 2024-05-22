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
  const hiit = await hb.addHiit(
    req.body.hiit_id,
    req.body.name,
    req.body.description,
    req.body.type
  );
  res.json(hiit);
}

async function postExercise(req, res) {
  const exercise = await hb.addExercise(req.body.name, req.body.description, req.body.exercise_duration, req.body.rest_duration, req.body.hiit_id);
  res.json(exercise);
}

async function getExercise(req, res) {
  res.json(await hb.listExercises());
}

async function handleDeleteHiit(req, res) {
  await hb.deleteHiit(req.params.id);
  res.status(204).send('will delete');
}

app.delete('/hiits/:id', handleDeleteHiit);
app.get('/hiits', getHiits);
app.post('/hiits', express.json(), postHiit);
app.post('/exercises', express.json(), postExercise);
app.get('/exercise', getExercise);
app.get('/app/*/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});


app.listen(8080);



