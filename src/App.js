// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import TodoList from './components/TodoList';
import AddTaskForm from './components/AddTaskForm';
import './App.css'

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Todo List</h1>
        <AddTaskForm />
        <h2 className="todo-list-container">Task List</h2>
        <TodoList />
      </div>
    </Provider>
  );
}

export default App;
