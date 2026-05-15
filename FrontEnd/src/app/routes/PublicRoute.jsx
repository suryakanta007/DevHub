import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router'

const PublicRoute = () => {
 const { isLoggedIn, isLoading } = useSelector((state) => state.auth);
  if (isLoading) {
    return (
      <main className="felx items-center justify-center">
        <div>Loading...</div>
      </main>
    );
  }
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return (
    <div>
      <Outlet/>
    </div>
  )
}

export default PublicRoute
