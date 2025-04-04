import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Loading from '../components/Loading'

const ProtectedRoute = ({ children, roles}) => {
    const { userRole, isLoading} = useAuth()

    if (isLoading) {
        return <Loading/>
    }

    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    if (!roles.includes(userRole)) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children
}

export default ProtectedRoute