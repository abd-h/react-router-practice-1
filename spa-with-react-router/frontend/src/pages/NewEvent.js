import React from 'react';
import { redirect, json } from 'react-router';
import EventForm from '../components/EventForm';

const NewEventPage = () => {
    return (
      <>
        <h1>NewEventPage</h1>
        <EventForm method='post' />
      </>
    );
}

export default NewEventPage;

