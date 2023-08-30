import { configureStore } from '@reduxjs/toolkit';
import AppointmentReducer from './reducer/AppointmentReducer';
import authSlice from './reducer/authenticationReducer';
import upLiftReducer from './reducer/upLiftReducer';

export const store = configureStore({
    reducer: {
        appointments:AppointmentReducer,
        authentication:authSlice,
        upLift: upLiftReducer,
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware({

        serializableCheck: false,
    }),
    devTools: process.env.NODE_ENV !== 'production',
})