import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fields: [], 
  selectedField:-1
};

export const FormBuilder = createSlice({
  name: 'formBuilder',
  initialState,
  reducers: {
   
    addField: (state,payload) => {
      state.fields = [...state.fields,payload.payload.field];
    }
    ,
    setSelectedField: (state,payload) => {
        state.selectedField = payload.payload;
    },

    updateField: (state,payload) => {
        const newArray = [...state.fields]; //making a new array
        newArray[state.selectedField] = payload.payload
        state.fields = newArray;
    },

    setFields:(state,payload) => {
      state.fields = payload.payload;
  }

    
    
  },
});

export const {
  addField,
  setSelectedField,
  updateField,
  setFields
} = FormBuilder.actions;

export default FormBuilder.reducer;