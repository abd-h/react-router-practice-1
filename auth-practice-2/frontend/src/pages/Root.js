import { Outlet, useSubmit, useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';


import MainNavigation from '../components/MainNavigation';
import { getTokenDuration } from '../utility/auth';

function RootLayout() {
  const submit = useSubmit();
  const token = useLoaderData();

  useEffect(() => {
    if (!token) {
      return;
    }

    const tokenDuration = getTokenDuration();
    console.log(tokenDuration);
    if (token === 'EXPIRED') {
      submit(null, {method: 'post', action: '/logout'})
    }
    setTimeout(() => {
      submit(null, { method: 'post', action: '/logout' });
    }, tokenDuration);
  },[token, submit])

  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
