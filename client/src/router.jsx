import React from 'react'
import { Home } from './pages/Home'
import { Projects } from './pages/Projects'
import { About } from './pages/About'
import { Contact } from './pages/Contact'
import { Blog } from './pages/Blog'
import { Login } from './pages/Login'
import { EditProject } from './pages/EditProject'
import { ProtectedLayout } from '../src/layouts/ProtectedLayout'
import { AutoDirectLayout } from '../src/layouts/AutoDirectLayout'
import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import { ContentLayout } from './layouts/ContentLayout'
import { Forbidden } from './components/Forbidden'
import { useSelector } from 'react-redux'
import { SingleProjectDetails } from './components/projects/SingleProjectDetails'
import { UpdateProject } from './components/projects/UpdateProject'
import { EditNote } from './pages/EditNote'


const router =  createBrowserRouter(createRoutesFromElements(
    <>
        
        <Route element={<ContentLayout />} >
            <Route index element={<Home />} />
            <Route element={<AutoDirectLayout />} >
                <Route path='/admin/login' element={<Login />} />
            </Route>
            <Route element={<ProtectedLayout />} >
                <Route path='/edit/project' element={<EditProject />} />
                <Route path='/edit/note' element={<EditNote />} />
                <Route path='/update/project/:project_id' element={<UpdateProject />} />
            </Route>
            <Route path='/projects' element={<Projects />} />
            <Route path='/projects/:project_id' element={<SingleProjectDetails />} />
            <Route exact path='/blog/:filter?' element={<Blog />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/forbidden' element={<Forbidden />} />
        </Route>
    </>
))

export default router