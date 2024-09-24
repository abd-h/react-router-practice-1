import React from 'react';
import { json, redirect, useRouteLoaderData } from 'react-router';

import EventsList from '../components/EventsList';

const EventsPage = () => {
  const events = useRouteLoaderData('event-detail');


  return (
    <>
      <EventsList events={events} />
    </>
  );
}

export default EventsPage;

export const loader = async ({ request, params }) => {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    throw json({message: 'Events not Loaded'}, {status: 500})
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

// delete event

export const action = async ({ request, params }) => {
  const method = request.method;
  const eventId = params.eventId;

  console.log(method);

  const response = await fetch('http://localhost:8080/events/' + eventId, {
    method: method,
  });

  if (!response.ok) {
    throw json({ message: 'Event no deleted' }, { status: 500 });
  }
  
  return redirect('/events')
}

