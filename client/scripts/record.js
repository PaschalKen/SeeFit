import { convertStoM, calculateTotalHiitDuration } from './timer.js';
import { getAllHiits  } from './script.js';
import {
  exercisesArray,
  currentExerciseIndex,
  exerciseElapsedTime,
  hiitElapsedTime,
  totalHiitDuration,
  intervalId,
  pausedState,
} from './timer.js';

let totalhiits = 0;
let completedExerciseCount = 0;
let completedTime = 0;


// Function to count completed HIITs
function countCompletedHiits() {
  totalhiits += 1;
}

export function handleCompleteHiit() {
  countCompletedHiits();
  completedHiitDetails(exercisesArray);
  populateDashboard();
  // exerciseElapsedTime = 0;
  // hiitElapsedTime = 0;
  // clearInterval(intervalId);

}

function completedHiitDetails(hiit) {
  let completedHiitDuration = calculateTotalHiitDuration(hiit);
  completedTime += completedHiitDuration;
  getExerciseCount(hiit);
  getCompletedHiitName(exercisesArray, completedHiitDuration);
}

function getExerciseCount(hiit) {
  const exerciseCount = hiit.length;
  completedExerciseCount += exerciseCount;
}

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

// Function to populate the dashboard
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