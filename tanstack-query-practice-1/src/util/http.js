export const fetchEvents = async ({ signal, searchTerm, eventId }) => {
    console.log(eventId);
  
    let url = 'http://localhost:3000/events';
    if (searchTerm) {
        url += `?search=${searchTerm}`;
    }

    if (eventId) {
        url = 'http://localhost:3000/events/' + eventId; 
    }

    const response = await fetch(url, signal)

    if (!response.ok) {
        const error = new Error('An Error has occurred while fetching data!');
        error.code = error.status;
        error.info = await response.json();
        throw error;
    };
    const { events } = await response.json();
    return events;
}

// export const eventDetail = async (eventId) => {

// }

export const deleteEvent = async (id) => {
    const response = await fetch(`http://localhost:3000/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
        const error = new Error('Could not delete event');
        error.code = error.status;
        error.info = await response.json();
        throw error;
    }
    return response.json();
}

