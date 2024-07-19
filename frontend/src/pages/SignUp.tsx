import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import '../styles/SignUp.scss'

export default function SignUp() {
  return (
    <main>
        <Header />
        <div className='SP-A1'>
            <div className='SP-B1'>
                <div>Login</div>
            </div>
            <form className='SP-B2'>
                <div className='SP-C1'>
                    <input type="text" placeholder='Email' />
                </div>
                <div className='SP-C2'>
                    <input type="text" placeholder='Password' />
                </div>
                <div className='SP-C3'>
                    <button type='submit'>SignUp</button>
                </div>
                <div className='SP-C4'>Already have a account? <Link to='login'><span className='SP-D1'>Login</span></Link></div>
                <div className='SP-C5'>Google Auth</div>
            </form>
        </div>
    </main>
  )
}
