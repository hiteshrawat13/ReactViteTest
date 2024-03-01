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
      state.selectedField=-1
    },
    removeField: (state,payload) => {
      const indexToRemove=payload.payload
      state.fields = [...state.fields.slice(0, indexToRemove), ...state.fields.slice(indexToRemove + 1)];
      state.selectedField=-1
    },
    duplicateField: (state,payload) => {
      const indexToDuplicate=payload.payload
      state.fields = [...state.fields.slice(0, indexToDuplicate),state.fields[indexToDuplicate],state.fields[indexToDuplicate], ...state.fields.slice(indexToDuplicate + 1)];
      state.selectedField=-1
    },
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
  removeField,
  duplicateField,
  setSelectedField,
  updateField,
  setFields
} = FormBuilder.actions;

export default FormBuilder.reducer;