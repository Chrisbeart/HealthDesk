import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Dein Root-Reducer

const store = configureStore({
  reducer: rootReducer,
});

export default store;
