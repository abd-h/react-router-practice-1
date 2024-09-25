import React, { Suspense} from 'react';
import { json, redirect, useRouteLoaderData, defer, Await } from 'react-router';

import EventsList from '../components/EventsList';
import { eventsLoader } from './EventsLoader';

const EventsPage = () => {
  const {events} = useRouteLoaderData('event-detail');


  return (
   <>
   <Suspense fallback={<p>Not aveilable yet</p>}>
     <Await resolve={events}>
       {(loadedEvent) => <EventsList events={loadedEvent} />}
     </Await>
   </Suspense>
 </>
  );
}

export default EventsPage;

export const loader = async ({ request, params }) => {

  return defer({
    events: eventsLoader()
  })

  // const response = await fetch('http://localhost:8080/events');

  // if (!response.ok) {
  //   throw json({message: 'Events not Loaded'}, {status: 500})
  // } else {
  //   const resData = await response.json();
  //   return resData.events;
  // }
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

 