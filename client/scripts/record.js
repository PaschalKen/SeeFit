// import { buildHiitExercisePage } from "./script.js";

// export async function getHiitName() {

//   const name = await buildHiitExercisePage();
//       const card = document.querySelector('.card');
//       card.addEventListener('click', () => {
//         console.log('name');
//       });
//   return name;
// }
let totalExercises = 0;
let totalCompletedDuration = 0;

// Function to handle the completion of a HIIT
export async function handleCompleteHiit(clickedHiit) {
  resetTimer();
  countCompletedHiits();
  clearInterval(intervalId);

  const hiitName = await buildHiitExercisePage(clickedHiit);
  console.log(
    `HIIT completed: ${hiitName}`,
    `total time: ${(totalCompletedDuration += totalHiitDuration)}`,
    `no-of-exercises: ${(totalExercises += exercisesArray.length)}`
  );
}