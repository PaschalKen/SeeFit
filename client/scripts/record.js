import { convertStoM, calculateTotalHiitDuration, exercisesArray } from './timer.js';
import { getAllHiits } from './script.js';

// This file contains functions related to recording and handling completed HIITs in a web application.

let totalhiits = 0;
let completedExerciseCount = 0;
let completedTime = 0;


// Function to count completed HIITs
function countCompletedHiits() {
  totalhiits += 1;
}

// Function to handle completion of a HIIT
export function handleCompleteHiit() {
  countCompletedHiits();
  completedHiitDetails(exercisesArray);
  populateDashboard();
}

// Function to calculate and store details of a completed HIIT
function completedHiitDetails(hiit) {
  const completedHiitDuration = calculateTotalHiitDuration(hiit);
  completedTime += completedHiitDuration;
  getExerciseCount(hiit);
  getCompletedHiitName(exercisesArray, completedHiitDuration);
}

// Function to get the count of exercises in a HIIT
function getExerciseCount(hiit) {
  const exerciseCount = hiit.length;
  completedExerciseCount += exerciseCount;
}

// Function to get the name of a completed HIIT and display it on the dashboard
async function getCompletedHiitName(exercisesArray, completedDuration) {
  const hiitId = exercisesArray[0].hiit_id;
  const hiits = await getAllHiits();
  const completedHiit = hiits.find((hiit) => hiit.hiits_id === hiitId);

  const completedHiits = document.querySelector('.finished-hiits-holder');
  const section = document.createElement('section');

  const completedHiitTitle = document.createElement('h3');
  completedHiitTitle.textContent = completedHiit.name;

  const completedHiitDuration = document.createElement('p');
  completedHiitDuration.textContent = convertStoM(completedDuration);

  section.classList.add('completed-hiit');
  section.append(completedHiitTitle, completedHiitDuration);
  completedHiits.appendChild(section);
}

// Function to populate the dashboard with total HIITs, total time, and total exercises
function populateDashboard() {
  const totalHiitsElem = document.querySelector('.total-hiits');
  const totalDurationElem = document.querySelector('.total-time');
  const totalExercisesElem = document.querySelector('.total-exercises');

  totalHiitsElem.childNodes[0].nodeValue =
    totalhiits > 9 ? totalhiits : `0${totalhiits}`;
  totalDurationElem.childNodes[0].nodeValue = convertStoM(completedTime);
  totalExercisesElem.childNodes[0].nodeValue =
    completedExerciseCount > 9
      ? completedExerciseCount
      : `0${completedExerciseCount}`;
}
