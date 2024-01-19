import React, { useState, useEffect } from 'react'
import { Sidebar } from '../components/blog/Sidebar'
import { useLocation } from 'react-router-dom'

export const Blog = () => {
  const [formData, setFormData] = useState(null)
  const params = useLocation()
  const filter = params.search?.split('?',2)[1]?.split('=',2) || null
  const filterTerm = filter !== null ? `${filter[0]}=${filter[1]}` : null
  const getData = async (signal) => {
    const res = await fetch(`/api/notes?${filterTerm}`, {signal})
    if(res.ok === false) {
      return
    }
    const data = await res.json()
    setFormData(data)
  }
  
  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    getData(signal)

    return () => {
      if(signal.aborted) controller.abort()
    }
  }, [filterTerm])

  const notesElement = formData && Object.values(formData).map((data, index) => {
    const noteType = data.type.map((type, index) => {
      return (
        <div className='bg-green-100 px-3 py-1 rounded shadow-lg' key={type + index}>
          <a href='#'>{type}</a>
        </div>
      )
    })
    const noteCategories = data.categories.map((category, index) => {
      return (
        <div className='bg-green-100 px-3 py-1 rounded shadow-lg' key={category + index}>
          <a href='#'>{category}</a>
        </div>
      )
    })
    return (
      <div key={index + Object.keys(formData)}>
        <span>here are the notes</span>
        <div>Title: {data.title}</div>
        <div>{noteType}</div>
        <div>{noteCategories}</div>
        <span>{data?.createdAt}</span>
        <p>{data.notes}</p>
      </div>
    )
  })


  return (
    <div className='flex flex-row'>
      <Sidebar />
      <div className='w-full'>
        {formData && notesElement}
      </div>
    </div>
  )
}
