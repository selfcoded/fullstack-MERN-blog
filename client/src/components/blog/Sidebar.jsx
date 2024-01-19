import React from 'react'
import { NOTE_DETAIL_CONST } from '../../constants'
import { Link } from 'react-router-dom'

export const Sidebar = () => {
    const typeElement = NOTE_DETAIL_CONST.type.map((type, index) => {
        const category = Object.keys(type)
        const types = Object.values(type)[0]

        const typesElement = types.map((single, index) => {
            return (
                <Link key={index + single} to={`?categories=${single}`} className="flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:hover:bg-gray-300 dark:hover:text-gray-800">{single}</Link>
        )})

        return(
            <div key={index + 'sidebar'}>
                <div className="flex items-center w-full p-2 text-base text-gray-900 transition duration-75 rounded-lg group ">
                    
                    <h2 className="flex-1 ms-3 text-left rtl:text-right whitespace-nowrap">{category}</h2>
                </div>
                <ul className="py-2 space-y-2">
                    <li>
                        {typesElement}
                    </li>
                </ul>
            </div>
        )
    })
  return (
    <div className='h-screen w-80 bg-gray-100 text-black'>
        <div>here is the type</div>
        {typeElement}
    </div>
  )
}
