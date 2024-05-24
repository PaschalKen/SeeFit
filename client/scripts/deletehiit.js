const ui = {};

// Function to delete a HIIT
export async function deleteHiit(hiit) {
  const toBeDeleted = document.querySelector(
    `.${hiit.name.replace(/\s+/g, '')}`,
  );
  const response = await fetch(`/hiits/${hiit.hiits_id}`, {
    method: 'DELETE',
  });
  if (response.ok) {
    toBeDeleted.remove();
  } else {
    console.error('Failed to delete HIIT', response);
    toBeDeleted.style.display = 'grid';
  }
}

// Function to remove a HIIT before deleting
export function removeHiitBeforeDelete(hiit, event) {
  const toBeDeleted = document.querySelector(
    `.${hiit.name.replace(/\s+/g, '')}`,
  );
  event.stopPropagation();
  if (!toBeDeleted) {
    return;
  }
  toBeDeleted.style.display = 'none';
  ui.eventInfo = document.querySelector('.event-info');
}

// Function to create a delete popup for a HIIT
export function createDeletePopup(hiit) {
  const confirmDelete = document.querySelector('.confirm-delete');
  const overlay = document.createElement('section');
  overlay.className = 'overlay';

  const projectCreatePopup = document.createElement('section');
  projectCreatePopup.className = 'card-body';
  projectCreatePopup.classList.add('popup');

  const projectCreateTitle = document.createElement('h3');
  projectCreateTitle.className = 'card-title';

  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('height', '18');
  svg.setAttribute('viewBox', '0 -960 960 960');
  svg.setAttribute('width', '18');

  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute(
    'd',
    'm256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z',
  );

  svg.appendChild(path);

  const btnHolder = document.createElement('section');
  const deleteBtn = document.createElement('button');
  const cancelBtn = document.createElement('button');

  btnHolder.append(cancelBtn, deleteBtn);

  deleteBtn.className = 'button';
  cancelBtn.className = 'button';
  cancelBtn.textContent = 'Cancel';
  deleteBtn.textContent = 'Yes, Delete';
  projectCreatePopup.append(svg, projectCreateTitle, btnHolder);
  projectCreateTitle.textContent = 'Delete this hiit?';
  confirmDelete.appendChild(projectCreatePopup);
  svg.classList.add('close-icon');

  const closeIcon = document.querySelector('.close-icon');

  closeIcon.addEventListener('click', () => {
    closePopup();
  });

  overlay.addEventListener('click', () => {
    closePopup();
  });

  cancelBtn.addEventListener('click', () => {
    closePopup();
  });

  deleteBtn.addEventListener('click', (event) => {
    removeHiitBeforeDelete(hiit, event);
    deleteHiit(hiit);
    closePopup();

    ui.eventInfo.textContent = 'HIIT deleted successfully';
    ui.eventInfo.style.opacity = '1';
    setTimeout(() => {
      ui.eventInfo.style.opacity = '0';
    }, 3000);
  });

  document.body.appendChild(overlay);
  document.body.appendChild(confirmDelete);
}

// Function to close the delete popup
function closePopup() {
  const Popup = document.querySelector('.card-body');
  Popup.remove();

  const overlay = document.querySelector('.overlay');
  overlay.parentNode.removeChild(overlay);
}
