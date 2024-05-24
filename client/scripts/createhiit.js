import { showScreen } from './script.js';
import { getAssets } from './script.js';

// Importing the showScreen function from the script.js file

// Object to store references to DOM elements
const createForm = {};

// Array to store exercise data
let exerciseDataArray = [];

// Index of the exercise being edited
let editingIndex = null;

// Function to get references to DOM elements
function getCreateHandles() {
  // Get references to various DOM elements
  createForm.createHiitForm = document.querySelector('.hiit-form');
  createForm.hiitName = document.querySelector('.hiitName');
  createForm.hiitDescription = document.querySelector('.hiitDescription');
  createForm.createBtn = document.querySelector('.create-btn');
  createForm.addBtn = document.querySelector('.add-btn');
  createForm.exerciseName = document.querySelector('.exerciseName');
  createForm.exerciseDescription = document.querySelector('.exerciseDesc');
  createForm.exerciseDuration = document.querySelector('.exerciseDuration');
  createForm.exerciseRestDuration = document.querySelector('.restDuration');
  createForm.add = document.querySelector('.createWorkoutIcon');
  createForm.createHiit = document.querySelector('.createHiitIcon');
  createForm.addedExerciseHolder = document.querySelector('.added-exercises-holder');
  createForm.createHiitCard = document.querySelector('.createHiitCard');
  createForm.eventInfo = document.querySelector('.event-info');
}

// Function to initialize event listeners
function get() {
  // Add event listener to createHiitCard element
  createForm.createHiitCard.addEventListener('click', () => {
    showScreen('createhiit');
  });
  // Update the add exercise button text
  updateAddExerciseBtn();
}

// Function to update the text of the add exercise button
function updateAddExerciseBtn() {
  createForm.add.addEventListener('click', () => {
    showScreen('createhiit');
    // Update the button text based on whether an exercise is being edited or added
    if (editingIndex !== null) {
      createForm.addBtn.textContent = 'Update Exercise';
    } else {
      createForm.addBtn.textContent = 'Add Exercise';
    }
  });
}

// Function to get the data for the HIIT workout
function getHiitData() {
  const name = createForm.hiitName.value.trim();
  const description = createForm.hiitDescription.value.trim();
  const type = 'custom';
  // Check if all fields are filled before creating a HIIT workout
  if (!name || !description) {
    return;
  }
  return { name, description, type };
}

// Function to get the data for an exercise
function getExerciseData() {
  const name = createForm.exerciseName.value.trim();
  const description = createForm.exerciseDescription.value.trim();
  const exercise_duration = createForm.exerciseDuration.value.trim();
  const rest_duration = createForm.exerciseRestDuration.value.trim();
  return { name, description, exercise_duration, rest_duration };
}

// Function to generate a UUID
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}


// Function to send the HIIT data to the server
async function sendHiitData() {
  const customHiitCards = document.querySelector('.custom-hiit-card');
  customHiitCards.innerHTML = '';

  const hiit_id = generateUUID(); // Generate a UUID for HIIT ID
  const hiitData = {
    hiit_id,
    ...getHiitData(),
  };
  showScreen('Custom');
  getAssets();

  const responseHiit = await fetch('/hiits', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hiitData),
  });
  if (responseHiit.ok) {
    sendExerciseData(hiit_id);
    clearExistingFormDataOnCreate();
    createForm.eventInfo.textContent = 'HIIT created successfully';
    createForm.eventInfo.style.opacity = '1';
    setTimeout(() => {
      createForm.eventInfo.style.opacity = '0';
    }, 3000);
  } else {
    console.error('Failed to create HIIT', responseHiit);
  }
}

// Function to clear existing form data on create
function clearExistingFormDataOnCreate() {
  createForm.createHiitForm.reset();
  exerciseDataArray = [];
}

function sendExerciseData(hiit_id) {
  // Associate each exercise with the generated HIIT ID
  exerciseDataArray.forEach(async (exerciseData) => {
    exerciseData.hiit_id = hiit_id;

    const responseExercise = await fetch('/exercise', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(exerciseData),
    });

    if (responseExercise.ok) {
      createForm.addedExerciseHolder.innerHTML = '';
    } else {
      createForm.eventInfo.textContent = 'Failed to add exercise';
      createForm.eventInfo.style.opacity = '1';
      setTimeout(() => {
        createForm.eventInfo.style.opacity = '0';
      }, 3000);
    }
  });
}

// Function to add an exercise
function AddExercise() {
  const exerciseData = getExerciseData();
  // Check if all fields are filled before adding an exercise
  if (
    !exerciseData.name ||
    !exerciseData.description ||
    !exerciseData.exercise_duration ||
    !exerciseData.rest_duration
  ) {
    return;
  }
  if (editingIndex !== null) {
    exerciseDataArray[editingIndex] = exerciseData;
    editingIndex = null;
  } else {
    exerciseDataArray.push(exerciseData);
  }
  updateExerciseList();
  createForm.exerciseName.value = '';
  createForm.exerciseDescription.value = '';
  createForm.exerciseDuration.value = '';
  createForm.exerciseRestDuration.value = '';
  createForm.addBtn.textContent = 'Add Exercise';
  createForm.eventInfo.textContent = 'Exercise added successfully';
  createForm.eventInfo.style.opacity = '1';
  setTimeout(() => {
    createForm.eventInfo.style.opacity = '0';
  }, 3000);
}

// Function to update the exercise list
function updateExerciseList() {
  const addedExerciseHolder = createForm.addedExerciseHolder;
  addedExerciseHolder.innerHTML = '';

  exerciseDataArray.forEach((exercise, index) => {
    const addedExercise = document.createElement('section');
    addedExercise.classList.add('added-exercise');

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>';
    deleteButton.addEventListener('click', () => deleteExercise(index));

    const exerciseName = document.createElement('span');
    exerciseName.textContent = exercise.name;

    addedExercise.appendChild(exerciseName);
    addedExercise.appendChild(deleteButton);
    addedExercise.addEventListener('click', () => populateExerciseData(index));

    addedExerciseHolder.appendChild(addedExercise);
  });
}

// Function to populate the exercise data in the form for editing
function populateExerciseData(index) {
  editingIndex = index;
  const exercise = exerciseDataArray[index];
  createForm.exerciseName.value = exercise.name;
  createForm.exerciseDescription.value = exercise.description;
  createForm.exerciseDuration.value = exercise.exercise_duration;
  createForm.exerciseRestDuration.value = exercise.rest_duration;
  createForm.addBtn.textContent = 'Update Exercise';
}

// Function to delete an exercise
function deleteExercise(index) {
  exerciseDataArray.splice(index, 1);
  updateExerciseList();
}

// Function to add event listeners
function addEventListeners() {
  createForm.addBtn.addEventListener('click', AddExercise);
  createForm.createBtn.addEventListener('click', sendHiitData);
}

// Exported function to initialize the createHiit module
export function initi() {
  getCreateHandles();
  get();
  addEventListeners();
}
