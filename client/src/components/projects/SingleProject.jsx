import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export const SingleProject = () => {
  const [formData, setFormData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

   const getProjects = async (signal) => {
     setError('')
     setLoading(true)
     const res = await fetch('/api/projects',{signal})
      try {
        if(res.ok === false) {
          setLoading(false)
          return
        }
        const data = await res.json()
        setFormData(data)
        setLoading(false)
      } catch(err) {
        setError('something went wrong')
      }
  }
  useEffect(() => {
    const controller =  new AbortController()
    const signal = controller.signal
    getProjects(signal)

    return () => {
      if(signal.aborted) controller.abort()
    }
  }, [])

  const singleProjectElement = formData && Object.values(formData).map((data, index) => {
    const projectType = data.type.map((type, index) => {
      return (
        <div className='bg-green-100 px-3 py-1 rounded shadow-lg' key={type + index}>
          <a href='#'>{type}</a>
        </div>
      )
    })
    const projectCategories = data.categories.map((category, index) => {
      return (
        <div className='bg-green-100 px-3 py-1 rounded shadow-lg' key={category + index}>
          <a href='#'>{category}</a>
        </div>
      )
    })

      return (
      <div key={data._id} className='border-b-2 border-gray-300 w-full shadow-lg p-6 flex flex-row text-lg font-semibold'>
        <div className='flex-1 flex-col'>
          <h1 className='text-3xl'>Title: <span className='font-bold'>{data.title}</span></h1>
          <div className='flex gap-2 py-2'>Type:{projectType}</div>
          <div className='flex gap-2 py-2'>Categories:{projectCategories}</div>
          <p>Introduction: <span className='font-normal'>{data.introduction}</span></p>
        </div>
        <div className='relative flex-1 flex flex-col items-end pb-12'>
          <img className='w-60 h-60 rounded-lg shadow-lg object-cover' src={data.imgUrl} alt='sdasd' /> 
          <div className='absolute w-full bottom-0 left-0 flex flex-row gap-3 justify-end'>
            <a href={data.projectLink}>Project link</a>
            <Link to={`/projects/${data._id}`}>read more</Link>
          </div>

        </div>
      </div>)
  })

  return (
    <div className='flex flex-col px-16 justify-center items-start gap-6'>
      { loading ? 'loading....' : singleProjectElement }
      { error !== '' && <p>{error}</p>}
    </div>
  )
}
