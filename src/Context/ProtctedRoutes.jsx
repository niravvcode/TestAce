import React, { useContext } from 'react'
import { useAuth } from './AuthContext'
import Login from '../Components/Login';
import { Navigate, Outlet } from 'react-router-dom';

function ProtctedRoutes() {
    const isToken  =  localStorage.getItem("token");

    return isToken? <Outlet/> : <Navigate to="/login"/>;
};

export default ProtctedRoutes;
