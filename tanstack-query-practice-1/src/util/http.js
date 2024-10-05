export const fetchEvents = async ({ signal, searchTerm, eventId }) => {
  let url = "http://localhost:3000/events";
  if (searchTerm) {
    url += `?search=${searchTerm}`;
  }
  const response = await fetch(url, signal);

  if (!response.ok) {
    const error = new Error("An Error has occurred while fetching data!");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  const { events } = await response.json();
  return events;
};

export const eventDetail = async ({ eventId }) => {
  const id = eventId.id;

  const response = await fetch("http://localhost:3000/events/" + id);

  if (!response.ok) {
    const error = new Error("An Error Occurred!");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();
  return event;
};

// sending new event!
export const createNewEvent = async (eventData) => {
  const response = await fetch("http://localhost:3000/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });
  if (!response.ok) {
    const error = new Error("Could not send event data!");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  const { event } = await response.json();
  return event;
};

export const deleteEvent = async (id) => {
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const error = new Error("Could not delete event");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  return response.json();
};
