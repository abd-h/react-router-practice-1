import { Link, useNavigate, useParams, redirect, useSubmit, useNavigation } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { eventDetail, queryClient, updateEventData } from '../../util/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import NewEvent from './NewEvent.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const submit = useSubmit();
  const { state } = useNavigation();

  const { data } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => eventDetail({ signal, id: params.id })
  });

  // const { mutate, isPending, isError, error } = useMutation({
  //   mutationFn: updateEventData,
  //   // onSuccess: (() => queryClient.invalidateQueries({ queryKey: ['events']
  //   // })),
  //   onMutate: async (data) => {
  //     const newData = data.event;

  //     await queryClient.cancelQueries({ queryKey: ['events', params.id] });

  //     const previousEvent = queryClient.getQueriesData(['events', params.id]);

  //     queryClient.setDefaultOptions(['events', params.id], newData);

  //     return previousEvent;
  //   },
    
  //   onError: (error, data, context) => {
  //     queryClient.setQueryData(['events', params.id], context.previousEvent);
  //   },

  //   onSettled: () => {
  //     queryClient.invalidateQueries(['events', params.id]);
  //   }
  // })

  function handleSubmit(formData) {
    // mutate({event:formData, id:params.id});
    // navigate('../');
    submit(formData, {method: 'PUT'})
  }

  function handleClose() {
    navigate('../');
  }
console.log(data);
  return (
    <Modal onClose={handleClose}>
      <EventForm inputData={data} onSubmit={handleSubmit}>
        {state === "submitting" ? (
          <p>Submitting data...</p>
        ) : (
          <>
            <Link to="../" className="button-text">
              Cancel
            </Link>
            <button type="submit" className="button">
              Update
            </button>
          </>
        )}
      </EventForm>
    </Modal>
  );
};

export const loader = async ({ request, params }) => {
  
  return queryClient.fetchQuery({
    queryKey: ['events', params.id],
    queryFn: (({signal}) => eventDetail({signal, id: params.id}))
  })
}

export const action = async ({ request, params }) => {
  const formData = await request.formData();
  const updatedEventData = Object.fromEntries(formData);

  await updateEventData({ id: params.id, event: updatedEventData });

  await queryClient.invalidateQueries(['events']);
  
  return redirect('../')
}
