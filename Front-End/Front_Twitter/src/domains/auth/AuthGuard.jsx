import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { verifytokenService } from './service';
import { setUser } from '../users/slice';

const AuthGuard = (WrappedComponent) => {

    const auth = (props) => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const authData = useSelector((state) => state.authentification);
        const isConnected = authData.isConnected;
        const token = authData.token;
        console.log(token);
        
        // const isConnected = true;
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im9saXZpZXJAbWFpbC5jb20iLCJpYXQiOjE3NDEwNzk2ODQsImV4cCI6MTc0MTA4MzI4NCwic3ViIjoiMSJ9.JM3K06m64PTEKxlIH2EjPhRXGcZ_0pUDi1SlQceKOsg";
    
        useEffect(() => {
            const checkUserToken = async () => {
                if (token) {
                    try {
                        const userData = await verifytokenService(token);
                        dispatch(setUser({ 
                            username: userData.username, 
                            id: userData.id 
                        }));
                    } catch (error) {
                        // TODO taost
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