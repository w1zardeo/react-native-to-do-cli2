// store.js
import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import themeReducer from './themeSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    theme: themeReducer,
  },
});

export default store;
