import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AddTask.scss';

export default function AddTask() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo');
  const [error, setError] = useState<string | null>(null);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5051/u1/api/tasks/add', {
        title,
        description,
        status
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/task');
    } catch (error) {
      setError('Failed to add task. Please try again.');
    }
  };

  return (
    <main className="add-task-container">
      <div className="add-task-card">
        <h2>Add New Task</h2>
        <form onSubmit={handleAddTask}>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'done')}
              required
            >
              <option value="todo">TODO</option>
              <option value="in-progress">IN PROGRESS</option>
              <option value="done">DONE</option>
            </select>
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit">Add Task</button>
        </form>
      </div>
    </main>
  );
}
