import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { verifytokenService } from './service';
import { setUser } from '../users/slice';
import { setIsConnected } from './slice';

const AuthGuard = (WrappedComponent) => {

    const auth = (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const authData = useSelector((state) => state.authentification);
        const isConnected = authData.isConnected;
        const token = authData.token;
        
        useEffect(() => {
            const checkUserToken = async () => {
                if (token) {
                    try {
                        const userData = await verifytokenService(token);
                        dispatch(setUser({ 
                            username: userData.username, 
                            id: userData.id 
                        }));
                        dispatch(setIsConnected(true))
                    } catch (error) {
                        // TODO taost
                        localStorage.clear();
                        setIsConnected(false)
                        navigate('/login');
                    }
                } else {
                    navigate('/login');
                }
            };
            checkUserToken();
        }, []);

        return (isConnected ? <WrappedComponent {...props} /> : null);
    }

    return auth;
}

export default AuthGuard