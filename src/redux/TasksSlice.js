// tasksSlice.js
import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {},
  reducers: {
    setTasks: (state, action) => {
      return action.payload;
    },
    // Ви можете додати інші редюсери для управління завданнями
  },
});

export const { setTasks } = tasksSlice.actions;
export default tasksSlice.reducer;
