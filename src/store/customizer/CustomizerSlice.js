import { createSlice } from '@reduxjs/toolkit';

const initialState = {

  isCollapse: false, // to make sidebar Mini by default

};

export const CustomizerSlice = createSlice({
  name: 'customizer',
  initialState,
  reducers: {
   
    toggleSidebar: (state) => {
      state.isCollapse = !state.isCollapse;
    },

    hideSidebar: (state) => {
      state.isCollapse = true;
    }
    
  },
});

export const {
  toggleSidebar,hideSidebar
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;