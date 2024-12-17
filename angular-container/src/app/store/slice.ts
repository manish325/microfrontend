import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAppState, IUser } from './types';


const initialState: IAppState = {
    user: null, // Initialize user as null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state : IAppState, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    clearUser: () => {
      return {
        user : null
      }
    },
  },
});

// Export the actions
export const { setUser, clearUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
