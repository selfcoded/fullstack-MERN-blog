import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

export const SingleProjectDetails = () => {
    const { admin } = useSelector((state) => state.user)
    const [singleProject, setSingleProject] = useState(null)
    const { project_id } = useParams()
    const navigate = useNavigate()
    const getSingleProject = async () => {
        const res = await fetch(`/api/projects/${project_id}`)
        if(res.ok === false) return
        const detail_data = await res.json()
        setSingleProject(detail_data)
    }
    const deleteProject = async () => {
        const res = await fetch(`/api/projects/delete/${project_id}`)
        if(res.ok === false) return
        const mess = await res.json()
        navigate('/projects')
    }
    const updateProject = () => {
        navigate(`/update/project/${project_id}`)
    }
    useEffect(() => {
        getSingleProject()
    },[])
  return (
    <div>
        {singleProject && <>
            <h1>{singleProject.title}</h1>
            <span>{singleProject.updatedAt}</span>
            <h4>introduction</h4>
            <img src={singleProject.imgUrl}/> 
            <h2>type</h2>
            <h2>categories</h2>
            <p>notes</p>
            {admin && 
                <>
                <button onClick={updateProject}>update</button>
                <button onClick={deleteProject}>delete</button>
                </>
                }
        </>}
    </div>
  )
}
