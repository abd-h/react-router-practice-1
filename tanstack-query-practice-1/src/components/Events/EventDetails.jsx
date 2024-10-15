import { Link, Outlet, useParams, useNavigate} from "react-router-dom";

import Header from "../Header.jsx";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteEvent, eventDetail, queryClient } from "../../util/http.js";
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from "../UI/ErrorBlock.jsx";
import Modal from "../UI/Modal.jsx";
import { useState } from "react";

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const params = useParams();
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['event', params.id],
    queryFn: (({ signal }) => eventDetail({ signal, id:params.id }))
  });

  const { mutate, isPending: isPendingDeletion } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: "none",
      });
      navigate('/events')
    }
  })

  const handleStartDelete = () => {
    setIsDeleting(true);
  }

  const handleStopDeleting = () => {
    setIsDeleting(false);
  }

  const handleDelete = () => {
    // const proceed = window.confirm('Are you sure you want to delete?');

    // if (proceed) {
    //   mutate(params.id);
    //   navigate('/events');
    // }
       mutate(params.id);
       
  }

  let content = null;

  if (isPending) {
    content = <LoadingIndicator />
  }

  if (isError) {
    content = <ErrorBlock title='An error occurred' message={ error.info?.message || 'Could not fetch event detail data!'} />
  }


  console.log(data);

  if (data) {
    content = (
      <>
        {" "}
        <div id="event-details-content">
          <img
            src={`http://localhost:3000/${data.image}`}
            alt={`${data.title}`}
          />
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
      </>
    );
  }

  
  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDeleting}>
          {isPendingDeletion && <h2>Deleting event detail...</h2>}
          {!isPendingDeletion && (
            <>
              {" "}
              <h2>Are you sure?</h2>
              <p>
                Do you want to delete this event? this action can not be
                reversed!
              </p>
              <div className="form-actions">
                <button className="button-text" onClick={handleStopDeleting}>
                  Cancel
                </button>
                <button className="button" onClick={handleDelete}>
                  Delete
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

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
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>

        {content}
      </article>
    </>
  );
}
