import React from 'react';
import EventForm from '../components/EventForm';
import { useRouteLoaderData } from 'react-router';

const EditEventPage = () => {
  const event = useRouteLoaderData('event-id');
  return (
    <>
      <h1>EditEventPage</h1>
      <EventForm method='patch' event={event} />
    </>
  );
}

export default EditEventPage;