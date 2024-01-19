import React from 'react'
import { Link } from 'react-router-dom'
import { CONTENT as content} from '../assets/content/content.js'
import { RecentProjects } from '../components/projects/RecentProjects.jsx'


export const Home = () => {
  return (
    <div className='w-full'>
      <div className='w-full h-60 flex justify-center items-center border-b-2 border-gray-200'>
        <h3>{content.welcome_section}</h3>
      </div>
      <RecentProjects />
    </div>
  )
}
