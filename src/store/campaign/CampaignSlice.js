import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], 
  
};

export const FormBuilder = createSlice({
  name: 'campaign',
  initialState,
  reducers: {
   
    addField: (state,payload) => {
      state.fields = [...state.fields,payload.payload.field];
      state.selectedField=-1
    }

    
    
  },
});

export const {
  addField,
} = FormBuilder.actions;

export default FormBuilder.reducer;