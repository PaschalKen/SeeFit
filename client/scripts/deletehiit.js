export async function deleteHiit(id) {
    const response = await fetch(`/hiits/${id}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        console.log('HIIT deleted successfully');
    } else {
        console.log('Failed to delete HIIT', response);
    }
}

