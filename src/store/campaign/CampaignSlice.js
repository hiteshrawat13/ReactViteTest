import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {}, 
  
};

export const CampaignSlice = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
   
    setData: (state,payload) => {
      state.data = payload.payload;
    },
    addData: (state,payload) => {
      state.data = {...state.data,...payload.payload};
    },
    updateData: (state,payload) => {
      const newObj = {...state.data}; //making a new array
      newObj[payload.payload.prop] = payload.payload.value
      state.data = newObj;
  },

    
    
  },
});

export const {
  setData,
  addData,
  updateData
} = CampaignSlice.actions;

export default CampaignSlice.reducer;