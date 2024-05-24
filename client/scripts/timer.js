import { getAllExercises, showScreen } from './script.js';
import { handleCompleteHiit } from './record.js';

// Import necessary functions from other files

// Global variables
let exercisesArray = [];
let currentExerciseIndex = 0;
let exerciseElapsedTime = 0;
let hiitElapsedTime = 0;
let totalHiitDuration = 0;
let intervalId = null;

// Store the paused state of the timer
let pausedState = {
  elapsedTime: 0,
  currentExerciseIndex: 0,
};

// Export necessary variables
export {
  exercisesArray,
  currentExerciseIndex,
  exerciseElapsedTime,
  hiitElapsedTime,
  totalHiitDuration,
  intervalId,
  pausedState,
};

// Object to store timer elements
const timerElem = {};

// Increment value for timer
const increment = 1;

// Function to get timer handles
function getTimerHandles() {
  timerElem.currentExercise = document.querySelector('.current-exercise');
  timerElem.nextExercise = document.querySelector('.next-exercise');
  timerElem.exerciseDescription = document.querySelector('.current-exercise-description');
  timerElem.timer = document.querySelector('.timer');
  timerElem.pauseButton = document.querySelector('.pause');
  timerElem.playButton = document.querySelector('.play');
  timerElem.stateInfo = document.querySelector('.state-info');
  timerElem.restartButton = document.querySelector('.restart');
  timerElem.progressBar = document.querySelector('.timer-progress-holder');
}

// Create an audio object for timer sound
const sound = new Audio('../media/audio/timer.ogg');

// Timer running function
function timerRunning() {
  if (hiitElapsedTime === totalHiitDuration) {
    clearInterval(intervalId);
    handleCompleteHiit();
    resetTimer();
    resetHiitData();
    return;
  }
  sound.play();

  const currentExercise = exercisesArray[currentExerciseIndex];
  const nextExercise = exercisesArray[currentExerciseIndex + 1];

  if (!currentExercise) {
    console.error('Current exercise is undefined');
    return;
  }

  const currentExerciseName = currentExercise.name;
  const currentExerciseDescription = currentExercise.description;
  const nextExerciseName = nextExercise ? nextExercise.name : 'Complete';

  timerElem.currentExercise.textContent = currentExerciseName;
  timerElem.exerciseDescription.textContent = currentExerciseDescription;
  timerElem.nextExercise.textContent = 'Next: ' + nextExerciseName;

  moveToNextActivity(currentExercise);
}

//on and off audio cue
function togglePlayPause() {
  const toggleSwitch = document.querySelector('.toggle-input');
  toggleSwitch.addEventListener('change', function () {
    if (toggleSwitch.checked) {
      sound.muted = true;
        timerElem.stateInfo.textContent = 'Muted';
        timerElem.stateInfo.style.opacity = '1';
        setTimeout(() => {
          timerElem.stateInfo.style.opacity = '0';
        }, 3000);
    } else {
      sound.muted = false;
        timerElem.stateInfo.textContent = 'Unmuted';
        timerElem.stateInfo.style.opacity = '1';
        setTimeout(() => {
          timerElem.stateInfo.style.opacity = '0';
        }, 3000);
    }
  });
}

// Function to check if the screen is left
export function checkIfScreenIsLeft(currentScreen, newScreen) {
  if (currentScreen === 'PerformHiit' && newScreen !== 'PerformHiit') {
    // Reset the necessary variables here
    resetHiitData();
    clearInterval(intervalId);
  }
}

// Function to reset HIIT data
export function resetHiitData() {
  // Reset the timer-related variables
  exercisesArray = [];
  currentExerciseIndex = 0;
  exerciseElapsedTime = 0;
  hiitElapsedTime = 0;
  totalHiitDuration = 0;
  pausedState = {
    elapsedTime: 0,
    currentExerciseIndex: 0,
  };
}

// Function to reset the timer
function resetTimer() {
  timerElem.timer.textContent = '00:00';
}

// Function to convert seconds to minutes format
export function convertStoM(time) {
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

// Function to calculate total HIIT duration
export function calculateTotalHiitDuration(Hiit) {
  totalHiitDuration = Hiit.reduce(
    (total, exercise) =>
      total + exercise.exercise_duration + exercise.rest_duration,
    0,
  );
  return totalHiitDuration;
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

// Function to stop the timer and restart
function stopTimer() {
  if (timerElem.pauseButton.classList.contains('hidden')) {
    timerElem.playButton.classList.add('hidden');
    timerElem.pauseButton.classList.remove('hidden');
  }
  timerElem.stateInfo.textContent = 'Restart';
  timerElem.stateInfo.style.opacity = '1';
  setTimeout(() => {
    timerElem.stateInfo.style.opacity = '0';
  }, 3000);

  // Clear the interval
  clearInterval(intervalId);
  sound.pause();
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
    (exercise) => exercise.hiit_id === clickedHiit,
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
  togglePlayPause();
}
