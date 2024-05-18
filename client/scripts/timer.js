import {
  getAllExercises,
  showScreen,
  buildHiitExercisePage,
} from './script.js';

// Global variables
let exercisesArray = [];
let currentExerciseIndex = 0;
let exerciseElapsedTime = 0;
let hiitElapsedTime = 0;
let totalHiitDuration = 0;
let intervalId = null;

let pausedState = {
  elapsedTime: 0,
  currentExerciseIndex: 0,
};

let totalhiits = 0;

const timerElem = {};

const increment = 1;

function getTimerHandles() {
  timerElem.currentExercise = document.querySelector('.current-exercise');
  timerElem.nextExercise = document.querySelector('.next-exercise');
  timerElem.exerciseDescription = document.querySelector(
    '.current-exercise-description'
  );
  timerElem.timer = document.querySelector('.timer');
  timerElem.pauseButton = document.querySelector('.pause');
  timerElem.playButton = document.querySelector('.play');
  timerElem.stateInfo = document.querySelector('.state-info');
  timerElem.restartButton = document.querySelector('.restart');
  timerElem.stateInfo = document.querySelector('.state-info');
  timerElem.progressBar = document.querySelector('.timer-progress-holder');
}

// Timer running function
function timerRunning() {
  // Check if hiit is completed
  if (hiitElapsedTime === totalHiitDuration) {
    handleCompleteHiit();
  }

  const currentExercise = exercisesArray[currentExerciseIndex];
  const nextExercise = exercisesArray[currentExerciseIndex + 1];

  const currentExerciseName = currentExercise.name;
  const nextExerciseName = nextExercise ? nextExercise.name : 'Complete';
  const currentExerciseDescription = currentExercise.description;

  timerElem.currentExercise.textContent = currentExerciseName;
  timerElem.exerciseDescription.textContent = currentExerciseDescription;
  timerElem.nextExercise.textContent = 'Next: ' + nextExerciseName;
  moveToNextActivity(currentExercise);
}

function convertStoM(time) {
  const isNegative = time < 0;
  const absTime = Math.abs(time);
  const minutes = Math.floor(absTime / 60);
  const seconds = absTime % 60;
  let formattedMinutes = String(minutes).padStart(2, '0');
  let formattedSeconds = String(seconds).padStart(2, '0');

  if (isNegative && minutes === 0) {
    formattedSeconds = `${59 - seconds}`;
  } else {
    formattedMinutes = isNegative ? `-${formattedMinutes}` : formattedMinutes;
  }

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to move to the next activity
function moveToNextActivity(currentExercise) {
  const actualExerciseDuration = currentExercise.exercise_duration;
  const actualRestDuration = currentExercise.rest_duration;

  const currentDuration =
    exerciseElapsedTime >= actualExerciseDuration
      ? actualRestDuration
      : actualExerciseDuration;
  const totalExerciseDuration = actualExerciseDuration + actualRestDuration;
  const remainingTime =
    currentDuration - (exerciseElapsedTime % currentDuration);

  if (exerciseElapsedTime === totalExerciseDuration) {
    currentExerciseIndex++;
    exerciseElapsedTime = 0;
  } else {
    hiitElapsedTime += increment;
    exerciseElapsedTime += increment;
    updateProgressBar();

    timerElem.timer.textContent = convertStoM(remainingTime);
    1;
    console.log(
      'exerciseElapsedTime',
      exerciseElapsedTime,
      'timer content',
      convertStoM(remainingTime)
    );
    if (exerciseElapsedTime >= actualExerciseDuration) {
      timerElem.currentExercise.textContent = 'Rest';
      timerElem.exerciseDescription.textContent = `Take a ${actualRestDuration} Second rest`;
    } else {
      timerElem.currentExercise.textContent = currentExercise.name;
      timerElem.exerciseDescription.textContent = currentExercise.description;
    }
  }
}

// Function to update the progress bar
function updateProgressBar() {
  const progress = (hiitElapsedTime / totalHiitDuration) * 100;
  timerElem.progressBar.style.setProperty('--progress', `${progress}%`);
}

export async function getCompletedHiitName() {
  const name = await buildHiitExercisePage();
  const card = document.querySelector('.card');
  card.addEventListener('click', () => {
    console.log('name');
  });
  return name;
}

// Function to reset the timer
function resetTimer() {
  timerElem.timer.textContent = '00:00';
}

// Function to count completed HIITs
function countCompletedHiits() {
  totalhiits += 1;
  console.log('completed', totalhiits);
}

// Function to handle the completion of a HIIT
export function handleCompleteHiit() {
  resetTimer();
  countCompletedHiits();
  clearInterval(intervalId);
}

// Function to calculate total HIIT duration
function calculateTotalHiitDuration(Hiit) {
  totalHiitDuration = Hiit.reduce(
    (total, exercise) =>
      total + exercise.exercise_duration + exercise.rest_duration,
    0
  );
}

// Function to add event listeners
function addEventListeners() {
  timerElem.pauseButton.addEventListener('click', pauseTimer);
  timerElem.playButton.addEventListener('click', resumeTimer);
  timerElem.restartButton.addEventListener('click', stopTimer);
}

// Function to pause the timer
export function pauseTimer() {
  pausedState.elapsedTime = hiitElapsedTime;
  pausedState.currentExerciseIndex = currentExerciseIndex;

  clearInterval(intervalId);
  timerElem.pauseButton.classList.add('hidden');
  timerElem.playButton.classList.remove('hidden');
  timerElem.stateInfo.textContent = 'Pause';
  timerElem.stateInfo.style.opacity = '1';
  setTimeout(() => {
    timerElem.stateInfo.style.opacity = '0';
  }, 3000);
}

// Function to resume the timer
function resumeTimer() {
  // Restore the elapsed time and current exercise index
  hiitElapsedTime = pausedState.elapsedTime;
  currentExerciseIndex = pausedState.currentExerciseIndex;
  // Show the pause button and hide the play button
  timerElem.playButton.classList.add('hidden');
  timerElem.pauseButton.classList.remove('hidden');
  // Update state info
  timerElem.stateInfo.textContent = 'Resume';
  timerElem.stateInfo.style.opacity = '1';
  setTimeout(() => {
    timerElem.stateInfo.style.opacity = '0';
  }, 3000);
  // Resume the timer interval
  intervalId = setInterval(timerRunning, 1000);
}

function stopTimer() {
  timerElem.stateInfo.textContent = 'Restart';
  timerElem.stateInfo.style.opacity = '1';
  setTimeout(() => {
    timerElem.stateInfo.style.opacity = '0';
  }, 3000);

  // Clear the interval
  clearInterval(intervalId);

  // Reset timer variables
  currentExerciseIndex = 0;
  exerciseElapsedTime = 0;
  hiitElapsedTime = 0;

  // Start the timer again
  intervalId = setInterval(timerRunning, 1000);
}

// Function to start the timer
export async function start(clickedHiit) {
  getTimerHandles();
  showScreen('PerformHiit');

  const exercises = await getAllExercises();
  const filteredExercises = exercises.filter(
    (exercise) => exercise.hiit_id === clickedHiit
  );

  exercisesArray = filteredExercises;
  calculateTotalHiitDuration(filteredExercises);

  // Check if the timer was paused and needs to be resumed
  if (pausedState.elapsedTime > 0) {
    resumeTimer();
  } else {
    // Start the timer interval
    intervalId = setInterval(timerRunning, 1000);
    addEventListeners();
  }
}
