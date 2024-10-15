import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();


export const fetchEvents = async ({ signal, searchTerm, max}) => {
  let url = "http://localhost:3000/events";

  if (searchTerm && max) {
    url += `?search=${searchTerm}&max=${max}`
  } else if (searchTerm) {
    url += `?search=${searchTerm}`;
  } else if (max) {
    url += `?max=${max}`
  }
  console.log(url);
  const response = await fetch(url, {signal});

  if (!response.ok) {
    const error = new Error("An Error has occurred while fetching data!");
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }
  const { events } = await response.json();
  return events;
};


export const eventDetail = async ({ signal, id }) => {

  console.log(id);

  const response = await fetch(`http://localhost:3000/events/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred could not load error');
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();

  return event;
}




// export const eventDetail = async ({ id, signal }) => {
//   const i = id.id;
//   console.log(id);

//   const response = await fetch(`http://localhost:3000/events/${id}`, {signal});

//   if (!response.ok) {
//     const error = new Error("An Error Occurred!");
//     error.code = error.status;
//     error.info = await response.json();
//     throw error;
//   }
//   const { event } = await response.json();
//   return event;
// };

// sending new event!
export const createNewEvent = async (eventData) => {
  console.log(eventData);
  const response = await fetch("http://localhost:3000/events", {
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

export const updateEventData = async ({event, id}) => {
  console.log(id);
  console.log(event);
  const response = await fetch(`http://localhost:3000/events/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({event}),
  })

  if (!response.ok) {
    const error = await response.json();
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

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

// fetching data containg selectable images
export const fetchSelectableImages = async ({ signal }) => {
  const response = await fetch('http://localhost:3000/events/images', signal);
  if (!response.ok) {
    const error = new Error('An error occurred!');
    error.code = error.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}