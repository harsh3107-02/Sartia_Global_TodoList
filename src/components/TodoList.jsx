// src/components/TodoList.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCompletion, deleteTask } from '../store';

function TodoList() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [expandedTasks, setExpandedTasks] = useState({}); // Tracks which tasks are expanded

  const toggleExpand = (taskId) => {
    setExpandedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return {
        truncated: words.slice(0, wordLimit).join(' ') + '...',
        isTruncated: true,
      };
    }
    return { truncated: text, isTruncated: false };
  };

  return (
    <div className="todo-list">
      {todos.map((task) => {
        const { truncated, isTruncated } = truncateText(task.description, 10);
        const isExpanded = expandedTasks[task.id];

        return (
          <div
            key={task.id}
            className={`task ${task.completed ? 'completed' : ''}`}
          >
            <div className="task-actions">
              <button onClick={() => dispatch(toggleCompletion(task.id))}>
                {task.completed ? 'Completed' : 'Mark as Completed'}
              </button>
              <button
                onClick={() => dispatch(deleteTask(task.id))}
                className="Delete"
              >
                Delete
              </button>
            </div>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">
              {isExpanded ? task.description : truncated}
              {isTruncated && (
                <button
                  className="see-more"
                  onClick={() => toggleExpand(task.id)}
                >
                  {isExpanded ? 'See Less' : 'See More'}
                </button>
              )}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default TodoList;
