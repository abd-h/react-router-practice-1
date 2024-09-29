import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Suspense } from 'react';

// import BlogPage, { loader as postsLoader } from './pages/Blog';
import HomePage from './pages/Home';
// import PostPage, { loader as postLoader } from './pages/Post';
import RootLayout from './pages/Root';

// file can also be imported this way
import * as pages from './utility/getImports';
// Another way a file can be loaded.
import { BlogPage, PostPage } from './utility/getImports';

// const BlogPage = lazy(() => import("./pages/Blog"));

// // Using async await
// const postsLoader = async () => {
//   const module = await import('./pages/Blog');
//   return module.loader();
// }


const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "posts",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<p>Loading</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: pages.postsLoader,
            // another way of getting the same result is using then
            // loader: () => import('./pages/Blog').then (module => module.loader()),
          },
          {
            path: ":id",
            element: <PostPage />,
            loader: pages.postLoader,
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
