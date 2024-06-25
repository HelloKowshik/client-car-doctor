import { AuthContext } from '../providers/AuthProvider';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(AuthContext);

    if(loading) return <span className="loading loading-dots loading-lg"></span>;

    if(user?.email) return children;

    return <Navigate state={location.pathname} to='/login' replace/>
};

export default PrivateRoute;
