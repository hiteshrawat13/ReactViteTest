import { createSlice } from '@reduxjs/toolkit';


export const ROLES={
  ADMIN:"ADMIN",
  USER:"USER"
}

const initialState = {
  isLoggedIn: false,  
  empId:null,
  role: ROLES.USER,
  token:null
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state,payload) => {
      state = payload;
    }

  },
});

export const {
  toggleSidebar,
} = UserSlice.actions;

export default UserSlice.reducer;