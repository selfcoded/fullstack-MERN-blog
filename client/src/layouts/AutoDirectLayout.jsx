import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'


export const AutoDirectLayout = () => {
    const { currentUser } = useSelector((state) => state.user)
    const [count, setCount] = useState(3)
    const redirectElement = (
        <div>you have logged in, you will be redirect back to home page in {count} mins</div>
    )
    const navigate = useNavigate()
    useEffect(() => {
        if( currentUser !== null ) {
            const timer = setTimeout(() => {
                setCount(prev => prev - 1)
            }, 1000);
            if (count === 0) {
                clearTimeout(timer)
                navigate('/')
            }
            
        }

    },[count])
    return (
        currentUser !== null ? redirectElement : <Outlet />
    )
}
