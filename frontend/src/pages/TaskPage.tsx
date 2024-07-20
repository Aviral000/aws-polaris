import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/TaskPage.scss';

interface Task {
  _id: string;
  title: string;
  description: string;
  taskNumber: number;
  status: 'todo' | 'in-progress' | 'done';
  createdAt: string;
}

export default function TaskPage() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('loggedIn');
  const token = localStorage.getItem('token');
  const [error, setError] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  
  useEffect(() => {
    if (loggedIn && token) {
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [loggedIn, token, navigate]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8082/u1/api/tasks/view', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response && error.response.status === 401) {
        setError('Authorization error');
        handleLogout();
      } else {
        setError('An error occurred');
      }
    } else {
      setError('An unexpected error occurred');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedIn');
    navigate('/login');
  };

  console.log(tasks);

  const renderTasksByStatus = (status: 'todo' | 'in-progress' | 'done') => {
    return tasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task._id} className='task-item'>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
          <div className='task-actions'>
            <button style={{ backgroundColor: 'blue' }}>View</button>
            <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
            <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(task._id)}>Delete</button>
          </div>
        </div>
      ));
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`http://127.0.0.1:8082/u1/api/tasks/delete/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(tasks.filter(task => task._id !== taskId));
    } catch (error) {
      handleApiError(error);
    }
  };

  return (
    <main>
      <Header />
      <div className='TK-A1'>
        {loggedIn ? (
          <div className='TK-B1'>
            <div className='TK-C1'>
              <button type='button' onClick={() => navigate('/add-task')}>Add Task</button>
            </div>
            <div className='TK-C2'>
              <div className='TK-D1'>
                <label htmlFor="search">Search: </label>
                <input type="text" placeholder='Search...' />
              </div>
              <div className='TK-D2'>
                <label htmlFor="sortby">Sort By:</label>
                <select id="sortby">
                  <option value="recent">Recent</option>
                  <option value="last">Last</option>
                  <option value="title">Title</option>
                </select>
              </div>
            </div>
            <div className='TK-C3'>
              <div className='column'>
                <div className='column-title'>TODO</div>
                <div>{renderTasksByStatus('todo')}</div>
              </div>
              <div className='column'>
                <div className='column-title'>IN PROGRESS</div>
                <div>{renderTasksByStatus('in-progress')}</div>
              </div>
              <div className='column'>
                <div className='column-title'>DONE</div>
                <div>{renderTasksByStatus('done')}</div>
              </div>
            </div>
            {error && <div className="error-message">{error}</div>}
          </div>
        ) : (
          <div>
            <p>You are not logged in. Redirecting to login...</p>
          </div>
        )}
      </div>
    </main>
  );
}
