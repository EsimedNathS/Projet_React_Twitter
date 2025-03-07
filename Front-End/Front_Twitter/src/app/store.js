import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../domains/auth/slice'
import userReducer from '../domains/users/slice';

const store = configureStore({
    reducer: {
        authentification: authReducer,
        user: userReducer,
    }
})

export default store;