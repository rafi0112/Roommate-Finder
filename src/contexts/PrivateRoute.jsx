
import React, {  useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Navigate, useLocation} from 'react-router';

const PrivateRoute = ({children}) => {
    const {currentUser,loading} = useContext(AuthContext);
    //console.log(currentUser)

    const location = useLocation();
    //console.log(location.pathname);


    if(loading){
        //console.log(loading)
        return <div className='flex justify-center items-center min-h-96'>
                    <span className="loading loading-spinner loading-xl min-h-96"></span>
                </div>
    }

    if (currentUser && currentUser.email){
        
        return children;
    }
    return <Navigate state={location?.pathname} to="/login"></Navigate>
    
}

export default PrivateRoute
