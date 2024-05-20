const ui = {};
let theme;
  theme = document.querySelectorAll('header > ul > li');
  ui.darkMode = theme[1];
  ui.lightMode = theme[2];
   ui.title = document.querySelector('header > h3');
export function toggleTheme() {
  ui.hiitTitle = document.querySelectorAll('.hiit-title');
  ui.hiitDescription = document.querySelectorAll('.no-of-exercises');

  let elem = document.body;
  if (ui.darkMode.classList.contains('hidden')) {
    ui.darkMode.classList.remove('hidden');
    ui.lightMode.classList.add('hidden');
    elem.classList.remove('light-mode');
    ui.title.classList.remove('light-mode');

    for (let i = 0; i < ui.hiitTitle.length; i++) {
      ui.hiitTitle[i].classList.remove('light-mode');
    }

    for (let i = 0; i < ui.hiitDescription.length; i++) {
      ui.hiitDescription[i].classList.remove('light-mode');
    }
  } else {
    ui.darkMode.classList.add('hidden');
    ui.lightMode.classList.remove('hidden');
    elem.classList.add('light-mode');
    ui.title.classList.add('light-mode');

    for (let i = 0; i < ui.hiitTitle.length; i++) {
      ui.hiitTitle[i].classList.add('light-mode');
    }

    for (let i = 0; i < ui.hiitDescription.length; i++) {
      ui.hiitDescription[i].classList.add('light-mode');
    }
  }
}
