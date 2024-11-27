
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../store';

const AddTaskForm = () => {
  const [taskDetails, setTaskDetails] = useState({ title: '', description: '' });
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleAddTask = () => {
    if (taskDetails.title.trim()) {
      dispatch(addTask({
        id: Date.now(),
        title: taskDetails.title.trim(),
        description: taskDetails.description.trim(),
        completed: false,
      }));
      setTaskDetails({ title: '', description: '' });
    }
  };

  return (
    <div className="task-form">
      <button type="button" onClick={handleAddTask} className="add-task-button">
        Add Task
      </button>
      <input
        type="text"
        name="title"
        value={taskDetails.title}
        onChange={handleInputChange}
        placeholder="Task Title"
        className="task-input"
        aria-label="Task Title"
      />
      <textarea
        name="description"
        value={taskDetails.description}
        onChange={handleInputChange}
        placeholder="Task Description"
        className="task-textarea"
        aria-label="Task Description"
      />
    </div>
  );
};


export default AddTaskForm;
