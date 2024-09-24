import React from 'react';
import { Outlet } from 'react-router';
import MainNavigation from '../components/MainNavigation';


const RoutLayout = () => {
  return (
      <>
          <MainNavigation />
          <main>
          <Outlet />
          </main>
      </>
  )
}

export default RoutLayout