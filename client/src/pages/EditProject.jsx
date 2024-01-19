import React, { useState } from 'react'
import { PROJECT_DETAIL_CONST } from '../constants.js'
import { useNavigate } from 'react-router-dom'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { app } from '../firebase.js'


export const EditProject = () => {
  const [formData, setFormData] = useState({type: [], categories: [], imgUrl: null })
  const [loading, setLoading] = useState(false)
  const [percent, setPercent] = useState(0)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  
  const handleData = (e) => {
    setMessage(null)
    if(e.target.checked || (e.target.name !== 'type' && e.target.name !== 'categories')) {
      const typeApend = [...formData.type, e.target.value]
      const CategoryApend = [...formData.categories, e.target.value]
      setFormData({
        ...formData,
        [e.target.name]: e.target.name === 'type'? typeApend : e.target.name === 'categories' ? CategoryApend : e.target.value
      })
    }else{
      const filterData = e.target.name === 'type' ? formData.type : formData.categories
      const filteredData = filterData.filter((value) => value !== e.target.value)
      setFormData({
        ...formData,
        [e.target.name]: filteredData
      })
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

  const handleImage = async (e) => {
    setPercent(0)
    const file = e.target.files[0]
    Promise.resolve(storageImage(file)).then((url) => {
      setFormData({ ...formData, [e.target.name]: url})
    }).catch((error) => {
      console.log(error);
    })
  }

  const storageImage = async (file) => {
    return new Promise((resolve, reject) => {
      const firebaseStorage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const imageRef = ref(firebaseStorage, fileName)
  
      const uploadTask = uploadBytesResumable(imageRef, file)
      uploadTask.on('state_changed', (snapshot) => {
        const progress = Math.floor((snapshot.bytesTransferred/snapshot.totalBytes) * 100)
        setPercent(progress)
        // switch (snapshot.state) {
        //   case 'paused':
        //     console.log('upload is paused')
        //     break
        //   case 'running':
        //     console.log('upload is running')
        //     break
        // }
      },
      (error) => {
        reject(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)
        })
      }
      )
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await fetch('/api/edit/project', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })
      if(res.ok === false) {
        setMessage(res.statusText)
        return
      }
      const data =  await res.json()
      setMessage(data)
      navigate('/')
    } catch (err) {
      setError(err)
    }

  }
  return (
    <div className="p-10 mb-20 flex flex-col min-h-screen w-full">
        <h1 className='text-center'>Edit your project's details</h1>
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
                      <div className='flex flex-row p-2 mt-1'>
                        <label htmlFor='project_link' className='p-2'>Link:</label>
                        <input required onChange={handleData} type="text" name="projectLink" id="project_link" className="flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" />
                      </div>
                      <div className='flex flex-col p-2 mt-1'>
                        <label htmlFor='introduction' className='p-2'>Introduction:</label>
                        <input required onChange={handleData} type="text" name="introduction" id="introduction" className="flex-1 border-2 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder='here is a short introduction'/>
                      </div>
                      <div className='flex flex-col p-2 mt-1'>
                        <p className='p-2'>please upload your images!</p>
                        <div className='flex flex-col justify-center items-start'>
                          <input name='imgUrl' required onChange={handleImage} type='file' accept='image/*' className='border-2'/>
                          {percent !== 0 && 
                           <div className="w-80 bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700">
                             <div className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500" style={{width: `${percent}%`}}></div>
                             <span>upload is {percent}% done!</span>
                           </div>}
                          { formData.imgUrl && 
                            <>
                              <img src={formData.imgUrl} alt='#' className='mt-8 w-60'/>
                              <button className='text-white mt-6 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800' type='button' onClick={(e) => {
                                setFormData({ ...formData, imgUrl: null})
                                e.target.parentElement.firstChild.value = null
                                setPercent(0)
                              }}>Remove</button>
                            </>
                          }
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
  )
}
