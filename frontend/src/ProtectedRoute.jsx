import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function ProtectedRoute({ component: Component, roles }) {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to='/login' />;
    }

    // if (roles && !roles.includes(user.role)) {
    //     return <Navigate to='/' />;
    // }

    return <Component />;

};
