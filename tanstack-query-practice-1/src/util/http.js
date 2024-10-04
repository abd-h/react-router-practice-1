
export const fetchEvents = async ({ signal, searchTerm }) => {
    let url = "http://localhost:3000/events";
    if (searchTerm) {
        url += `?search=${searchTerm}`;
    }

    const response = await fetch(url, signal);
    if (!response.ok) {
        const error = new Error('An Error has occurred, could not fetch data!');
        error.code = error.status;
        error.info = await response.json();
        throw error;
    }

    const { events } = await response.json();
    return events;
}

// export const fetchEvents = async ({ signal, searchTerm }) => {
  
//     let url = "http://localhost:3000/events";
//     if (searchTerm) {
//         url += '?search=' + searchTerm ;
//     }
//     const response = await fetch(url, signal);
//     if (!response.ok) {
//         const error = new Error("An error occurred whiled feching data!");
//         error.code = error.status;
//         error.info = await response.json();
//         throw error;
//     }
//     const { events } = await response.json();
//     return events;
// }


// export const fetchEvents = async({ signal, searchTerm }) => {
//     let url = "http://localhost:3000/events";
//     if (searchTerm) {
//         url += "?search=" + searchTerm;
//     }

//     const response = await fetch(url, signal);
//     if (!response.ok) {
//         const error = new Error('An Error has occured while fetching data!');
//         error.code = error.status;
//         error.info = await response.json();
//         throw error;
//     }

//     const { events } = await response.json();
//     return events;
// }

// export const fetchEvents = async ({searchQuery}) => {
//     let url = 'http://localhost:3000/events';
//     if (searchQuery) {
//         url = 'http://localhost:3000/events/' + `?search=${searchQuery}`;
//     }
//     log(url)
//     const response = await fetch("http://localhost:3000/events");
//     if (!response.ok) {
//         const error = new Error('An error occurred whiled feching data!');
//         error.code = error.status;
//         error.info = await response.json();
//         throw error;
//     }

//     const { events } = await response.json();

//     return events;
// }


// export async function fetchEvents() {
  
//   const response = await fetch("http://localhost:3000/events");

//   if (!response.ok) {
//     const error = new Error("An error occurred while fetching the events");
//     error.code = response.status;
//     error.info = await response.json();
//     throw error;
//   }

//   const { events } = await response.json();

//   return events;
// }