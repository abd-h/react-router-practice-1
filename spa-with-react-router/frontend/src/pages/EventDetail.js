import React from 'react';
import EventForm from '../components/EventForm'
import EventItem from '../components/EventItem';
import { json, redirect, useRouteLoaderData } from 'react-router';

const EventDetailPage = () => {
    const event = useRouteLoaderData('event-id');

    

    console.log(event);

    return (
      <>
        <h1>EventDetailPage</h1>
        <EventItem event={event} method='patch' />
      </>
    );
}

export default EventDetailPage;

export const loader = async ({ request, params }) => {
    const eventId = params.eventId;
    const response = await fetch('http://localhost:8080/events/' + eventId);

    if (!response.ok) {
        throw json({message: 'event not saved'}, {status: 500})
    } else {
        const resData = await response.json();
        return resData.event;
    }
}

export const action = async ({ request, params }) => {
  const method = request.method;
  const eventId = params.eventId;
  const data = await request.formData();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/events";

  if (method === "PATCH") {
    url = "http://localhost:8080/events/" + eventId;
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Event data is not saved" }, { status: 500 });
  }

  return redirect("/events");
};



