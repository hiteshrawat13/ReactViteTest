import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
//import BlogReducer from './apps/blog/BlogSlice';

export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    //chatReducer: ChatsReducer,
  
  },
});

export default store;