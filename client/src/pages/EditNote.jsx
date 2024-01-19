import React, { useState } from 'react'
import { PROJECT_DETAIL_CONST } from '../constants'
import { useNavigate } from 'react-router-dom'

export const EditNote = () => {
    const [formData, setFormData] = useState({type: [], categories: [], })
    const [loading, setLoading] = useState(false)
    const [error, seterror] = useState(null)
    const [message, setMessage] = useState('')
    const navigate = useNavigate()
    const handleData = (e) => {
        if(e.target.name === 'type') {
            setFormData({
                ...formData,
                type: [...formData.type, e.target.value]
            })
        } else if (e.target.name === 'categories') {
            setFormData({
                ...formData,
                categories: [...formData.categories, e.target.value]
            })
        } else {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            })
        }

    }
    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res =  await fetch('/api/edit/note', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if(res.ok === false) {
                setLoading(false)
                return
            }
            const data = await res.json()
            setMessage(data)
            setLoading(false)
            navigate('/blog')
        } catch(err) {
            seterror(err)
        }
    }
    const typeElements = PROJECT_DETAIL_CONST.type.map((type, index) => (
        <div className='flex flex-row justify-center items-center' key={type+index}>
          <input onChange={handleData} type="checkbox" name='type' id={type} value={type} className="flex-1 border-2 bg-transparent h-4 leading-6" />
          <label htmlFor={type} className='p-2'>{type}</label>
        </div>
      ))
      const categoriesElements = PROJECT_DETAIL_CONST.categories.map((category, index) => (
        <div className='flex flex-row justify-center items-center' key={category+index}>
          <input onChange={handleData} type="checkbox" name='categories' id={category} value={category} className="flex-1 border-2 bg-transparent h-4 leading-6" />
          <label htmlFor={category} className='p-2'>{category}</label>
        </div>
      ))
  return (
    <div>
        <div className="p-10 mb-20 flex flex-col min-h-screen w-full">
        <h1 className='text-center'>Edit your note's details</h1>
        <form onSubmit={handleSubmit} >
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-6">
                    <div>
                      <div className='flex flex-row p-2 mt-1'>
                        <label htmlFor='title' className='p-2'>Title:</label>
                        <input required onChange={handleData} type="text" name="title" id="title" className="flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="here is the title" />
                      </div>
                      <div className='flex flex-row p-2 mt-1'>
                        <p className='p-2'>Type:</p>
                        <div className='flex flex-wrap'>
                          {typeElements}
                        </div>
                      </div>
                      <div className='flex flex-row p-2 mt-1'>
                        <p className='p-2'>Categories:</p>
                        <div className='flex flex-wrap'>
                          {categoriesElements}
                        </div>
                      </div>
                      <div className='flex flex-col p-2 mt-1 h-96'>
                        <p className='p-2'>NOTES:</p>
                        <textarea required onChange={handleData} name="notes" id="notes" className="flex-1 border-2 bg-transparent py-1.5 pl-1 rounded-md text-gray-900 focus:ring-0 sm:text-sm sm:leading-6" />
                      </div>
                      <div className='flex flex-col p-2 mt-10'>
                        {message && <p>{message}</p>}
                        {error && <p>{error}</p>}
                        <button type='type' className='text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>{loading ? 'loading...' : 'Create Project'}</button>
                      </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    </div>
  )
}
