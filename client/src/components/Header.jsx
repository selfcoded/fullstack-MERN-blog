import React from 'react'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <div className='text-gray-100 
      bg-indigo-500 
      w-full flex 
      justify-center 
      gap-6 
      px-8
      items-center
      '>
        <img src='#' alt='logo'/>
        <Link className='flex py-6 flex-1 justify-center items-center hover:bg-purple-400 w-full h-full rounded-md hover:text-black hover:shadow-sm' to=''>Home</Link>
        <Link className='flex py-6 flex-1 justify-center items-center hover:bg-purple-400 w-full h-full rounded-md hover:text-black hover:shadow-sm' to='/projects'>Projects</Link>
        <Link className='flex py-6 flex-1 justify-center items-center hover:bg-purple-400 w-full h-full rounded-md hover:text-black hover:shadow-sm' to='/blog'>Blog</Link>
        <Link className='flex py-6 flex-1 justify-center items-center hover:bg-purple-400 w-full h-full rounded-md hover:text-black hover:shadow-sm' to='/about'>About</Link>
        <Link className='flex py-6 flex-1 justify-center items-center hover:bg-purple-400 w-full h-full rounded-md hover:text-black hover:shadow-sm' to='/contact'>Contact</Link>
    </div>
  )
}
