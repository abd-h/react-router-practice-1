import React, { Suspense } from "react";
import EventForm from "../components/EventForm";
import EventItem from "../components/EventItem";
import { json, redirect, useRouteLoaderData, defer, Await } from "react-router";
import EventsList from "../components/EventsList";
import { eventLoader, eventsLoader } from "./EventsLoader";

const EventDetailPage = () => {
  const {event} = useRouteLoaderData("event-id");
  const {events} = useRouteLoaderData("event-detail");

  return (
    <>
      <Suspense fallback={<p>Not aveilable yet</p>}>
        <Await resolve={event}>
          {(loadedEvent) => <EventItem event={loadedEvent} />}
        </Await>
      </Suspense>
      <Suspense fallback={<p>Not aveilable yet</p>}>
        <Await resolve={events}>
          {(loadedEvent) => <EventsList events={loadedEvent} />}
        </Await>
      </Suspense>
    </>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const eventId = params.eventId;

    return defer({
        events: await eventsLoader(),
        event: eventLoader(eventId),
  });

  // const response = await fetch('http://localhost:8080/events/' + eventId);

  // if (!response.ok) {
  //     throw json({message: 'event not saved'}, {status: 500})
  // } else {
  //     const resData = await response.json();
  //     return resData.event;
  // }
};

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

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Event data is not saved" }, { status: 500 });
  }

  return redirect("/events");
};
