import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/TaskPage.scss';

interface Task {
  _id: string;
  title: string;
  description: string;
  taskNumber: number;
}

export default function TaskPage() {
    const navigate = useNavigate();
    const loggedIn = localStorage.getItem('loggedIn');
    const token  = localStorage.getItem('token');
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

    return (
        <main>
            <Header/>
            <div className='TK-A1'>
              {loggedIn ? (
                  <div className='TK-B1'>
                    <div className='TK-C1'>
                      <button type='button'>Add Task</button>
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
                    <div>

                    </div>
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