import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/TaskPage.scss';
import debounce from 'lodash.debounce';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);

  useEffect(() => {
    if (loggedIn && token) {
      fetchTasks();
    } else {
      navigate('/login');
    }
  }, [loggedIn, token, navigate]);

  useEffect(() => {
    filterAndSortTasks();
  }, [searchTerm, sortBy, tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://13.232.144.164:5051/u1/api/tasks/view', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTasks(response.data);
    } catch (error) {
      handleApiError(error);
    }
  };

  const debounceSearch = useCallback(
    debounce((term: string) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debounceSearch(event.target.value);
  };

  const filterAndSortTasks = () => {
    let result = tasks.filter(task =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === 'recent') {
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'last') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (sortBy === 'title') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    setFilteredTasks(result);
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

  const updateTaskStatus = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'done') => {
    try {
      await axios.put(`https://13.232.144.164:5051/u1/api/tasks/update/${taskId}`, 
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setTasks(tasks.map(task => task._id === taskId ? { ...task, status: newStatus } : task));
    } catch (error) {
      handleApiError(error);
    }
  };

  const renderTasksByStatus = (status: 'todo' | 'in-progress' | 'done') => {
    return filteredTasks
      .filter(task => task.status === status)
      .map(task => (
        <div key={task._id} className='task-item'>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Created At: {new Date(task.createdAt).toLocaleString()}</p>
          <div className='task-actions'>
            <button style={{ backgroundColor: 'blue' }} onClick={() => navigate(`/view-task/${task._id}`)}>View</button>
            <button onClick={() => navigate(`/edit-task/${task._id}`)}>Edit</button>
            <button style={{ backgroundColor: 'red' }} onClick={() => handleDelete(task._id)}>Delete</button>
            {task.status === 'todo' && <button onClick={() => updateTaskStatus(task._id, 'in-progress')}>Start</button>}
            {task.status === 'in-progress' && <button onClick={() => updateTaskStatus(task._id, 'done')}>Done</button>}
          </div>
        </div>
      ));
  };

  const handleDelete = async (taskId: string) => {
    try {
      await axios.delete(`https://13.232.144.164:5051/u1/api/tasks/delete/${taskId}`, {
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
                <input type="text" placeholder='Search title...' onChange={handleSearchChange} />
              </div>
              <div className='TK-D2'>
                <label htmlFor="sortby">Sort By:</label>
                <select id="sortby" value={sortBy} onChange={e => setSortBy(e.target.value)}>
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
