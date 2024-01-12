import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/admin/adminSlice'

export const Login = () => {
    const { loading, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const submitLogin = async (e) => {
        e.preventDefault()
        try {
            dispatch(loginStart()) 
            const res = await fetch('/api/auth/admin/login', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const data = await res.json()
            if (data.success === false) {
                dispatch(loginFailure(data.message))
                return;
            }
            dispatch(loginSuccess(data))
            navigate('/');
            
        } catch(error) {
            dispatch(loginFailure(error.message))
        }
    }
  return (
    <>
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form 
                onSubmit={submitLogin} 
                className="space-y-6" 
                method="POST">
                <div>
                    <label className="block text-sm font-medium leading-6 text-gray-900">Username</label>
                    <div className="mt-2">
                        <input 
                            onChange={handleChange} 
                            id="username" 
                            name="username" 
                            type="text" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                        <input 
                            onChange={handleChange} 
                            id="password" 
                            name="password" 
                            type="password" 
                            required 
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                </div>
                    <p>{error.message ? error.message : ''}</p>
                <div>
                    <button 
                        type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{loading ? 'Loading...' : 'Sign in'}</button>
                </div>
            </form>
        </div>
    </div>
    </>
  )
}
