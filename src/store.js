// src/store.js
import { configureStore, createSlice } from '@reduxjs/toolkit';

// Load tasks from local storage
const loadTasksFromLocalStorage = () => {
  try {
    const savedTasks = localStorage.getItem('todos');
    return savedTasks ? JSON.parse(savedTasks) : [];
  } catch (error) {
    console.error('Failed to load tasks from local storage:', error);
    return [];
  }
};

// Save tasks to local storage
const saveTasksToLocalStorage = (tasks) => {
  try {
    localStorage.setItem('todos', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks to local storage:', error);
  }
};

// Redux slice for tasks
const todoSlice = createSlice({
  name: 'todos',
  initialState: loadTasksFromLocalStorage(), // Load tasks from local storage on initial load
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveTasksToLocalStorage(state); // Save tasks to local storage after adding
    },
    deleteTask: (state, action) => {
      const updatedState = state.filter(task => task.id !== action.payload);
      saveTasksToLocalStorage(updatedState); // Save updated tasks after deletion
      return updatedState;
    },
    toggleCompletion: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        saveTasksToLocalStorage(state); // Save tasks to local storage after toggle
      }
    },
  },
});

export const { addTask, deleteTask, toggleCompletion } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export default store;
