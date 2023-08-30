// Create a Redux slice for authentication
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userRole: localStorage.getItem('userRole') || '', 
  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userRole = action.payload;
      localStorage.setItem('userRole', action.payload);

    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userRole = '';
      localStorage.removeItem('userRole');

    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
