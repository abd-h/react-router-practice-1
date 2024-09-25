import { json } from "react-router-dom";

export const eventsLoader = async () => {

    const response = await fetch('http://localhost:8080/events/');

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Events data not saved' }, { status: 500 });
    }

    const resData = await response.json();
    return resData.events;
}
export const eventLoader = async (eventId) => {

    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (response.status === 422) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: 'Events data not saved' }, { status: 500 });
    }

    const resData = await response.json();
    return resData.event;
}

