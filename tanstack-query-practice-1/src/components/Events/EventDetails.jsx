import { Link, Outlet, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useQuery } from '@tanstack/react-query';
import { eventDetail } from '../../util/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const eventId = useParams('event-id');
  
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['events', { 'event-ed': eventId }],
    queryFn: ((signal) => eventDetail({ signal, eventId })),
    staleTime: 5000,
  });

  let content;

  if (isLoading) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = <ErrorBlock title='An Error Occurred!' message={error.info?.message || 'Cannot load event detail'} />
  }

  if (data) {
    content = data;
  }

  console.log(data);


  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        <header>
          {data && <h1>{data.title} </h1>}
          <nav>
            <button>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        {data && (
          <div id="event-details-content">
            <img src={`http://localhost:3000/${data.image}`} alt={`${data.title}`} />
            <div id="event-details-info">
              <div>
                <p id="event-details-location">{data.location}</p>
                <time
                  dateTime={`Todo-DateT$Todo-Time`}
                >{`${data.date} @ ${data.time}`}</time>
              </div>
              <p id="event-details-description">{data.description} </p>
            </div>
          </div>
        )}
      </article>
    </>
  );
}
