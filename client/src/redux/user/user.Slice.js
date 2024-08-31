import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    signOut: (state) => {
      // Reset the state to the initial state when signing out
      console.log("hi")
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    // ... other reducers
  },
});

export const { signInStart, signInSuccess, signInFailure, signOut } = userSlice.actions;

export default userSlice.reducer;