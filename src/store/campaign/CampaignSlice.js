import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {}, 
  
};

export const CampaignSlice = createSlice({
  name: 'campaignData',
  initialState,
  reducers: {
   
    setData: (state,payload) => {
     
      const newObj = {...state}; //making a new array
      newObj.data = payload.payload;
      return newObj;
      
      
    },
    addData: (state,payload) => {
     
      const newObj = {...state}; //making a new array
      newObj.data  = payload.payload
      state = newObj;
      return state; // return is important to get it updated
       
      
    },
    updateData: (state,payload) => {
       
      const newObj = {...state}; //making a new array
      newObj.data[payload.payload.prop] = payload.payload.value
      state = newObj;
       
    },

    
    
  },
});

export const {
  setData,
  addData,
  updateData
} = CampaignSlice.actions;

export default CampaignSlice.reducer;