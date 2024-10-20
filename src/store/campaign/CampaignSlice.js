import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {
    form:[]
  }, 
  
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

    clearData:(state,payload)=>{
      const newObj = {}; //making a new array
      newObj.data = {form:[]}
      return newObj;
    },

    addData: (state,payload) => {
     
      const newObj = {...state}; //making a new array
      newObj.data  ={ ...newObj.data , ...payload.payload }
      state = newObj;
      return state; // return is important to get it updated
       
      
    },
    updateData: (state,payload) => {
       
      const newObj = {...state}; //making a new array

  
        newObj.data[payload.payload.prop] = payload.payload.value
    
      
      
      state = newObj;
       
    },





    // FORM BUILDER
    addField: (state,payload) => {
      state.data.form = [...state.data.form,payload.payload.field];
      
    },
    removeField: (state,payload) => {
      const indexToRemove=payload.payload
      state.data.form = [...state.data.form.slice(0, indexToRemove), ...state.data.form.slice(indexToRemove + 1)];
      
    },
    duplicateField: (state,payload) => {
      const indexToDuplicate=payload.payload
      state.data.form = [...state.data.form.slice(0, indexToDuplicate),state.data.form[indexToDuplicate],state.data.form[indexToDuplicate], ...state.data.form.slice(indexToDuplicate + 1)];
      
    },
    setSelectedField: (state,payload) => {
      state.selectedField = payload.payload;
    },
    updateField: (state,payload) => {
        const newArray = [...state.data.form]; //making a new array
        newArray[payload.payload.fieldId] = payload.payload.state
        state.data.form = newArray;
    },
    setFields:(state,payload) => {
      const obj=(payload.payload)
      const newArray = []; //making a new array
      obj.forEach((field,index)=> {
       newArray.push(field)
       })

      
      state.data.form=newArray
     
    },
    loadFieldsFromJson:(state,payload)=>{
      const obj=(payload.payload)
      const newArray = []; //making a new array
      obj.forEach((field,index)=> {
       newArray.push(field)
       })

      
      state.data.form=newArray
    }

    
    
  },
});

export const {
  setData,
  clearData,
  addData,
  updateData,

  addField,
  removeField,
  duplicateField,
  setSelectedField,
  updateField,
  setFields,
  loadFieldsFromJson
} = CampaignSlice.actions;

export default CampaignSlice.reducer;