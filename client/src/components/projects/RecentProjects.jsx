import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const RecentProjects = () => {
    const [formData, setFormData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const getRecentProjects = async () => {
        try {
            setError(null)
            setLoading(true)
            const res = await fetch('/api/projects/3')
            if(res.ok === false) {
                setLoading(false)
                return
            }
            const data = await res.json()
            setFormData(data)
            setLoading(false)
        } catch(err) {
        setError(err)
        }
    }
    useEffect(() => {
        getRecentProjects()
    }, [])

    const singleProjectElement = formData && Object.values(formData).map((data, index) => {
        const projectType = data.type.map((type, index) => {
            return (
                <div key={type + index}>
                <a href='#'>{type}</a>
                </div>
            )
        })
        const projectCategories = data.categories.map((category, index) => {
        return (
            <div key={category + index}>
            <a href='#'>{category}</a>
            </div>
        )
        })
        return (<div key={data._id} className='min-h-72 relative flex flex-1 flex-col bg-indigo-300 p-4 rounded-lg overflow-hidden text-sm'>
        <h1>Title:<span>{data.title}</span></h1>
        <div>Type:{projectType}</div>
        <h3>Categories:{projectCategories}</h3>
        <img src='sdasd' alt='sdasd' /> 
        <p>Introduction: {data.introduction}</p>
        <div className='absolute bottom-2 w-full left-0 flex gap-2 p-2 '>
            <a className='flex-1 bg-blue-300 p-1 rounded overflow-hidden text-center' href='kkk'>project link</a>
            <Link className='flex-1 bg-green-300 p-1 rounded overflow-hidden text-center' to={`/projects/${data._id}`}>read more</Link>
        </div>
        </div>)

  })
  return (
    <div className='flex justify-center items-center gap-6 px-20 py-6'>
        { loading ? 'loading....' : singleProjectElement }
        { error && <p>error</p>}
    </div>
  )
}

