import { start, checkIfScreenIsLeft } from './timer.js';
import { initi } from './createhiit.js';
import { createDeletePopup } from './deletehiit.js';

// Globals
// Different pages of the app
const pages = [
  {
    screen: 'Default',
    title: 'Default Hiits',
  },
  {
    screen: 'Custom',
    title: 'Custom Hiits',
  },
  {
    screen: 'Dashboard',
    title: 'Dashboard',
  },
  {
    screen: 'Hiit',
    title: 'Hiit',
  },
  {
    screen: 'PerformHiit',
    title: 'Perform Hiit',
  },
  {
    screen: 'createhiit',
    title: 'Create Hiit',
  },
];

let theme;
const ui = {};

export { ui };

const templates = {};

// Toggle between dark and light mode
export function toggleTheme() {
  ui.hiitTitle = document.querySelectorAll('.hiit-title');
  ui.hiitDescription = document.querySelectorAll('.no-of-exercises');

  const elem = document.body;
  if (ui.darkMode.classList.contains('hidden')) {
    ui.darkMode.classList.remove('hidden');
    ui.lightMode.classList.add('hidden');
    elem.classList.remove('light-mode');
    ui.title.classList.remove('light-mode');
  } else {
    ui.darkMode.classList.add('hidden');
    ui.lightMode.classList.remove('hidden');
    elem.classList.add('light-mode');
    ui.title.classList.add('light-mode');
  }
}

// Get handles to various elements in the UI
function getHandles() {
  ui.mainNav = document.querySelector('header > nav');
  ui.main = document.querySelector('main');
  ui.navButtons = document.querySelectorAll('header  > nav > button');
  ui.title = document.querySelector('header > h3');
  ui.screens = {};
  ui.buttons = {};
  ui.getScreens = () => Object.values(ui.screens);
  ui.getButtons = () => Object.values(ui.buttons);
  theme = document.querySelectorAll('header > ul > li');
  ui.darkMode = theme[1];
  ui.lightMode = theme[2];
  ui.darkMode.addEventListener('click', toggleTheme);
  ui.lightMode.addEventListener('click', toggleTheme);
  ui.createHiit = document.querySelector('aside > svg');
  templates.screen = document.querySelector('#screen-template');
  ui.eventInfo = document.querySelector('.event-info');
}

// Build the screens based on the pages array
function buildScreens() {
  const template = templates.screen;
  for (const page of pages) {
    const section = template.content.cloneNode(true).firstElementChild;
    section.dataset.id = `section-${page.screen}`;
    section.dataset.screen = page.screen;
    ui.main.append(section);
    ui.screens[page.screen] = section;
  }
}

// Set up the navigation bar with buttons
function setupNav() {
  ui.buttons = {};
  for (const page of pages) {
    const button = document.createElement('button');
    button.textContent = page.screen;
    button.classList.add('button');
    button.dataset.screen = page.screen;
    button.addEventListener('click', show);
    button.addEventListener('click', storeState);
    button.addEventListener('click', function () {
      styleActiveBtn(button, page.title);
    });

    if (
      page.screen === 'Default' ||
      page.screen === 'Custom' ||
      page.screen === 'Dashboard'
    ) {
      ui.mainNav.append(button);
    }

    ui.buttons[page.screen] = button;

    if (page.screen === ui.current) {
      button.classList.add('active');
    }
  }
}

// Style the active button
function styleActiveBtn(clickedBtn) {
  const activeButton = document.querySelector('.button.active');
  if (activeButton) {
    activeButton.classList.remove('active');
  }
  clickedBtn.classList.add('active');
  updatePageTitle();
}

// Update the page title
function updatePageTitle() {
  for (const btn of ui.getButtons()) {
    if (btn.classList.contains('active')) {
      ui.title.textContent = pages.find((page) => page.screen === btn.dataset.screen).title;
    }
  }
}

// Hide all screens
function hideAllScreens() {
  for (const screen of ui.getScreens()) {
    hideElement(screen);
  }
}

// Show a specific screen
function show(e) {
  ui.previousScreen = ui.currentScreen;
  const screen = e?.target?.dataset?.screen ?? 'Default';
  showScreen(screen);
}

// Show a specific screen and hide all others
export function showScreen(name) {
  hideAllScreens();
  if (!ui.screens[name]) {
    name = 'Default';
  }

  const currentScreen = ui.currentScreen;
  checkIfScreenIsLeft(currentScreen, name);

  showElement(ui.screens[name]);
  ui.currentScreen = name;
  document.title = `SeeFit | ${name}`;
}

// Hide an element by adding the 'hidden' class
function hideElement(element) {
  element.classList.add('hidden');
}

// Show an element by removing the 'hidden' class
function showElement(element) {
  element.classList.remove('hidden');
}

// Store the current screen state in the browser history
export function storeState() {
  history.pushState(
    ui.currentScreen,
    ui.currentScreen,
    `/app/${ui.currentScreen}`,
  );
}

// Read the current path from the URL
function readPath() {
  const path = window.location.pathname.slice(5);
  if (path) {
    return path;
  }
  return 'Default';
}

// Load the initial screen based on the URL path
function loadInitialScreen() {
  ui.current = readPath();
  const previousButton = ui.buttons[ui.current];
  if (previousButton) {
    previousButton.classList.remove('active');
    styleActiveBtn(previousButton, pages.title);
  }
  showScreen(ui.current);
}

// Fetch all exercises from the server
export async function getAllExercises() {
  const response = await fetch('/exercise');
  if (response.ok) {
    return await response.json();
  } else {
    return [{ msg: 'failed to load exercises :-(' }];
  }
}

// Calculate the total duration and exercise count for a specific HIIT
async function calcHiitInfo(clickedHiit) {
  const exercise = await getAllExercises();
  const filteredExercises = exercise.filter(
    (exercise) => exercise.hiit_id === clickedHiit,
  );
  let totalSeconds = 0;
  let exerciseCount = 0;

  for (const exercise of filteredExercises) {
    totalSeconds += exercise.exercise_duration += exercise.rest_duration;
    exerciseCount++;
  }
  return { duration: convertStoMs(totalSeconds), exerciseCount };
}

// Fetch the screen content from the server for a specific screen
async function fetchScreenContent(screen) {
  const url = `/screens/${screen}.inc`;
  const response = await fetch(url);

  if (response.ok) {
    return await response.text();
  } else {
    return `<p>Error loading content for ${screen}</p>`;
  }
}

// Get the screen content for all pages and append it to the respective screens
async function getScreenContent() {
  for (const page of pages) {
    const content = await fetchScreenContent(page.screen);
    const article = document.createElement('article');
    article.innerHTML = content;
    ui.screens[page.screen].append(article);
  }
}

// Convert seconds to minutes and seconds format (e.g. 5:30)
export function convertStoMs(seconds) {
  let minutes = Math.floor(seconds / 60);
  let extraSeconds = seconds % 60;
  minutes = minutes < 10 ? minutes : minutes;
  extraSeconds = extraSeconds < 10 ? '0' + extraSeconds : extraSeconds;
  return `${minutes}:${extraSeconds}`;
}

// Fetch all HIITs from the server
export async function getAllHiits() {
  const response = await fetch('/hiits');
  let hiits;
  if (response.ok) {
    hiits = await response.json();
    populateHiitCards(hiits);
    return hiits;
  } else {
    hiits = [{ msg: 'failed to load hiits :-(' }];
  }
}

// Populate the HIIT cards in the UI with data from the server
export async function populateHiitCards(hiits) {
  const defaultHiitCards = document.querySelector('.default-hiit-card');
  defaultHiitCards.innerHTML = '';

  for (const hiit of hiits) {
    const { duration, exerciseCount } = await calcHiitInfo(hiit.hiits_id);
    const section = document.createElement('section');
    const h3 = document.createElement('h3');
    h3.classList.add('hiit-title');
    h3.textContent = hiit.name;
    section.classList.add('card', hiit.name.replace(/\s+/g, ''));
    const hiitInfo = document.createElement('section');
    hiitInfo.classList.add('hiit-info');

    const noOfExercises = document.createElement('p');
    noOfExercises.classList.add('no-of-exercises');
    noOfExercises.textContent = `0${exerciseCount} Exercises | ${duration} Mins`;

    const deleteIcon = document.createElement('button');
    deleteIcon.classList.add('delete-icon');

    const svgIcon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    svgIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svgIcon.setAttribute('height', '24px');
    svgIcon.setAttribute('viewBox', '0 -960 960 960');
    svgIcon.setAttribute('width', '24px');
    svgIcon.setAttribute('fill', '#e8eaed');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute(
      'd',
      'M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z',
    );
    svgIcon.append(path);

    section.append(h3, hiitInfo);
    hiitInfo.append(noOfExercises);

    section.addEventListener('click', () => {
      buildHiitExercisePage(hiit.hiits_id);
    });
    handleDeleteEvent(deleteIcon, hiit);
    checkHiitType(
      hiit,
      defaultHiitCards,
      section,
      hiitInfo,
      deleteIcon,
      svgIcon,
    );
  }
  initi();
}

// Check the type of HIIT and append it to the appropriate container
function checkHiitType(hiit, defaultHiitCards, section, hiitInfo, deleteIcon, svgIcon) {
  if (hiit.type === 'default') {
    defaultHiitCards.append(section);
  } else if (hiit.type === 'custom') {
    const customHiitCards = document.querySelector('.custom-hiit-card');
    customHiitCards.append(section);
    hiitInfo.append(deleteIcon);
    deleteIcon.append(svgIcon);
  }
}

// Handle the delete event for a HIIT card
function handleDeleteEvent(deleteIcon, hiit) {
  deleteIcon.addEventListener('click', function (event) {
    event.stopPropagation();
    createDeletePopup(hiit, event);
  });
}

// Build the HIIT exercise page with data from the server
export async function buildHiitExercisePage(clickedHiit) {
  document.querySelector('.hiit-exercises').innerHTML = '';
  showScreen('Hiit');
  const hiits = await getAllHiits();
  const { duration, exerciseCount } = await calcHiitInfo(clickedHiit);

  const clickedHiitObj = hiits.find((hiit) => hiit.hiits_id === clickedHiit);

  const hiitTitle = document.querySelector('.hiitpage-title');
  hiitTitle.textContent = clickedHiitObj.name;

  const hiitDescription = document.querySelector('.hiit-desc');
  hiitDescription.textContent = clickedHiitObj.description;

  const noOfExercises = document.querySelector('.exerciseCount');
  noOfExercises.textContent = `${exerciseCount} Exercises`;

  const hiitDuration = document.querySelector('.hiitsDuration');
  hiitDuration.textContent = `${duration} Mins`;

  const exercise = await getAllExercises();
  const filteredExercises = exercise.filter(
    (exercise) => exercise.hiit_id === clickedHiit,
  );

  const startHiitBtn = document.createElement('button');
  startHiitBtn.dataset.screen = 'PerformHiit';

  startHiitBtn.classList.add('start-hiit');
  startHiitBtn.textContent = 'Start Hiit';
  startHiitBtn.addEventListener('click', function () {
    ui.previousScreen = 'Hiit';
    ui.title.textContent = clickedHiitObj.name;
    start(clickedHiit);
  });

  handleExerciseCards(filteredExercises);

  document.querySelector('.hiit-exercises').append(startHiitBtn);
  const hiitName = clickedHiitObj.name;
  return hiitName;
}

// Handle the exercise cards on the HIIT exercise page
function handleExerciseCards(filteredExercises) {
  filteredExercises.forEach((exercise) => {
    const exerciseCard = document.createElement('section');
    exerciseCard.classList.add('exercise-card');

    const exerciseTitle = document.createElement('h3');
    exerciseTitle.textContent = exercise.name;

    const exerciseDuration = document.createElement('p');
    exerciseDuration.textContent = convertStoMs(exercise.exercise_duration);

    const exerciseInfo = document.createElement('section');
    exerciseInfo.classList.add('exercise-info');

    const dropDown = document.createElement('section');
    dropDown.classList.add('drop-down');

    const content = document.createElement('section');
    content.classList.add('content');

    const exerciseDescription = document.createElement('article');
    exerciseDescription.textContent = exercise.description;

    exerciseInfo.append(exerciseTitle, exerciseDuration);
    exerciseCard.append(exerciseInfo, dropDown, content);
    content.append(exerciseDescription);

    document.querySelector('.hiit-exercises').append(exerciseCard);

    dropDown.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>';

    exerciseCard.addEventListener('click', function () {
      content.classList.toggle('hidden');
      toggleDropdownIcon(content, dropDown);
      handleDropdown(content);
    });
  });
}

// Toggle the dropdown icon based on the content visibility
function toggleDropdownIcon(content, dropDown) {
  if (content.scrollHeight > 1) {
    const svg = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg',
    );
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('height', '24px');
    svg.setAttribute('viewBox', '0 -960 960 960');
    svg.setAttribute('width', '24px');
    svg.setAttribute('fill', '#e8eaed');
    const path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path',
    );
    path.setAttribute(
      'd',
      'm296-345-56-56 240-240 240 240-56 56-184-184-184 184Z',
    );
    svg.appendChild(path);
    dropDown.innerHTML = '';
    dropDown.appendChild(svg);
  } else {
    dropDown.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e8eaed"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>';
  }
}

// Handle the dropdown behavior when clicked
function handleDropdown(content) {
  if (content.classList.contains('hidden')) {
    content.style.maxHeight = null;
  } else {
    content.style.maxHeight = content.scrollHeight + 'px';
  }
}

// Fetch all assets (HIITs and exercises) from the server
export async function getAssets() {
  await getAllHiits();
  await getAllExercises();
}

// Set up the application
function setup() {
  getHandles();
  buildScreens();
  getScreenContent();
  show();
  setupNav();
  window.addEventListener('popstate', loadInitialScreen);
  loadInitialScreen();
  getAssets();
}

setup();
