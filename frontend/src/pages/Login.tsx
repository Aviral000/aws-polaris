import React, { useState } from 'react'
import Header from '../components/Header'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../styles/SignUp.scss'

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const formData = {
          email: email,
          password: password
      };
  
      try {
          const response = await axios.post('http://127.0.0.1:8082/u1/api/login', formData);
          navigate('/login');
        } catch (err) {
          console.error('Error:', err);
          setError("Invalid Credentials");
        }
  };
  
  const validate = (formData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      confirmPassword: string;
  }): boolean => {
      if (!formData.email) {
          setError("Email is required");
          return false;
      }
      if (!formData.password) {
          setError("Password is required");
          return false;
      }
  
      setError("");
      return true;
  };

  return (
    <main>
        <Header />
        <div className='SP-A1'>
            <div className='SP-B1'>
                <div>Login</div>
            </div>
            <form className='SP-B2' onSubmit={handleSubmit}>
                <div className='SP-C1'>
                    <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className='SP-C1'>
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className='SP-C3'>
                    <button type='submit'>SignUp</button>
                </div>
                <div className='SP-C4'>Already have a account? <Link to='/signup'><span className='SP-D1'>SignUp</span></Link></div>
                <div className='SP-C5'>Google Auth</div>
                {error && <div className='SP-C6'>{error}</div>}
            </form>
        </div>
    </main>
  )
}
