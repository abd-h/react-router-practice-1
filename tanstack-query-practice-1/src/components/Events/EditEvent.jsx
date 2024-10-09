import { Link, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { eventDetail, updatedEvent } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const eventId = useParams('event-id');

  const { data } = useQuery({
    queryKey: ['event-ed'],
    queryFn: (({ signal }) => eventDetail({ signal, eventId }))
  })

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: updatedEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["event-updated"] });
      navigate("/events");
    },
  });

  function handleSubmit(formData) {
    mutate({ eventId, event: formData })
    
  }

  function handleClose() {
    navigate('../');
  }

  console.log(data);

  return (
    <Modal onClose={handleClose}>
      
        <EventForm inputData={data} onSubmit={handleSubmit}>
          {isPending && "Submitting"}
          {!isPending && (
            <>
              {" "}
              <Link to="../" className="button-text">
                Cancel
              </Link>
              <button type="submit" className="button">
                Update
              </button>
            </>
          )}
        </EventForm>
      
      {isError && (
        <ErrorBlock
          title="An Error Occurred"
          message={
            error.info?.message ||
            "Could not send data please fill all the fields and then"
          }
        />
      )}
    </Modal>
  );
}
