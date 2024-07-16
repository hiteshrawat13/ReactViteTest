import { configureStore } from '@reduxjs/toolkit';
import CustomizerReducer from './customizer/CustomizerSlice';
import UserSlice from './user/UserSlice';
import FormBuilderSlice from './formBuilder/FormBuilderSlice';

import CampaignSlice from './campaign/CampaignSlice';
export const store = configureStore({
  reducer: {
    customizer: CustomizerReducer,
    user: UserSlice,
    formBuilder:FormBuilderSlice,
    campaignData:CampaignSlice
  
  },
});

export default store;