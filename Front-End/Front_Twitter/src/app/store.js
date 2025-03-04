import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../domains/auth/slice'
import zweezReducer from '../domains/zweezs/slice';
import userReducer from '../domains/users/slice';

const store = configureStore({
    reducer: {
        authentification: authReducer,
        zweez: zweezReducer,
        user: userReducer,
    }
})

export default store;