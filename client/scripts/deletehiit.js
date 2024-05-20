const ui = {};

export async function deleteHiit(hiit) {
      const toBeDeleted = document.querySelector(
        `.${hiit.name.replace(/\s+/g, '')}`
      );
    const response = await fetch(`/hiits/${hiit.hiits_id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        toBeDeleted.remove();
        console.log('HIIT deleted successfully');
      

    } else {
        console.log('Failed to delete HIIT', response);
        toBeDeleted.style.display = 'grid';
    }
}

export function removeHiitBeforeDelete(hiit, event) {
  const toBeDeleted = document.querySelector(`.${hiit.name.replace(/\s+/g, '')}`);
  event.stopPropagation();
  if (!toBeDeleted) {
    return;
  }
  toBeDeleted.style.display = 'none';
  ui.eventInfo = document.querySelector('.event-info');
}