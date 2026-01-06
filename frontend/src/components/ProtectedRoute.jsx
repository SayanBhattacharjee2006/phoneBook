import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import useAuthStore from '../store/auth.store'
function ProtectedRoute() {
    const {isAuthenticated,loading} = useAuthStore();
    if(loading){
        return <div className="p-6">Loading...</div>;
    }

    if(!isAuthenticated){
        return <Navigate to="/login" replace />;
    }
  return <Outlet/>
}

export default ProtectedRoute