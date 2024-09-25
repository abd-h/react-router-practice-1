import React, { Suspense } from 'react';
import EventForm from '../components/EventForm';
import { useRouteLoaderData, Await } from 'react-router';

const EditEventPage = () => {
  const {event} = useRouteLoaderData('event-id');
  console.log(event);
  return (
    <>
      <h1>EditEventPage</h1>

      <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventForm method="patch" event={loadedEvent} />}
        </Await>
      </Suspense>
    </>
  );
}

export default EditEventPage;