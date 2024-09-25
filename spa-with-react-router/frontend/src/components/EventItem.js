import { Link, useActionData, useSubmit } from 'react-router-dom';
import classes from './EventItem.module.css';

function EventItem({ event }) {
  const submit = useSubmit();
 
console.log(event);
  function startDeleteHandler() {
    // ...
    const proceed = window.confirm('Are you sure you want to delete Event?');

    if (proceed) {
      submit(null, { method: "delete" });
      window.alert('Event is deleted!')
    }
    
  }

  return (
    <article className={classes.event}>
      <img src={event.image} alt={event.title} />
      <h1>{event.title}</h1>
      <time>{event.date}</time>
      <p>{event.description}</p>
      <menu className={classes.actions}>
        <Link to="edit">Edit</Link>
        <button onClick={startDeleteHandler}>Delete</button>
      </menu>
    </article>
  );
}

export default EventItem;
