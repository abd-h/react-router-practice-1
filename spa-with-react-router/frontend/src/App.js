// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// Done.
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// Done.
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// Done.
// 4. Add properly working links to the MainNavigation
// Done.
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// Done.
// 6. Output a list of dummy events to the EventsPage
// Done.
//    Every list item should include a link to the respective EventDetailPage
// Done
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RoutLayout from "./pages/RoutLayout";
import HomePage from "./pages/Home";
import EventsPage, { loader as eventsLoader, action as deleteAction } from "./pages/Events";
import NewEventPage from "./pages/NewEvent";
import EditEventPage from "./pages/EditEvent";
import EventDetailPage, { loader as eventDetailLoader, action as manipulateAction} from "./pages/EventDetail";
import EventsLayoutPage from "./pages/EventsLayout";
import ErrorPage from "./pages/Error";
import NewsletterPage, { action as newsletterAction} from "./pages/Newsletter";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events/",
        id: "event-detail",
        loader: eventsLoader,
        element: <EventsLayoutPage />,
        children: [
          { index: true, element: <EventsPage /> },
          {
            path: ":eventId/",
            id: "event-id",
            loader: eventDetailLoader,
            children: [
              { index: true, element: <EventDetailPage />, action: deleteAction},

              { path: "edit", element: <EditEventPage />, action: manipulateAction,  },
            ],
          },
          ,
          { path: "new", element: <NewEventPage />, action: manipulateAction },
        ],
      },
      { path: 'newsletter', element:  <NewsletterPage />, action: newsletterAction}
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
