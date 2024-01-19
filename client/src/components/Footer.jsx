import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

export const Footer = () => {
  const path = useLocation()
  const pathName = path.pathname
  const { currentUser } = useSelector((state) => state.user)

  
  return (
    <div className='bg-indigo-500 fixed bottom-0 w-full'>
        <footer className="m-4 rounded-lg shadow bg-gray-200 min-h-20 flex justify-center">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024. All Rights Reserved.
            </span>
            { currentUser === null ? <Link to='/admin/login'>Admin</Link> 
              : pathName === '/projects' ? <Link className='bg-indigo-200 rounded shadow-lg p-3' to='/edit/project'>Create New Project +</Link>
              : pathName === '/blog' ? <Link className='bg-indigo-200 rounded shadow-lg p-3' to='/edit/note'>Create New Notes +</Link>
              : null
            }
            {/* <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
            </ul> */}
            </div>
        </footer>
    </div>
  )
}
