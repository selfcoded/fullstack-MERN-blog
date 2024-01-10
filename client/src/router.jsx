import React from 'react'
import { Home } from '../pages/Home'
import { Projects } from '../pages/Projects'
import { About } from '../pages/About'
import { Contact } from '../pages/Contact'
import { Blog } from '../pages/Blog'
import { createBrowserRouter, Route, createRoutesFromElements } from 'react-router-dom'
import { ContentLayout } from '../layouts/ContentLayout'

const router =  createBrowserRouter(createRoutesFromElements(
    <>
        <Route element={<ContentLayout />} >
            <Route index element={<Home />} />
            <Route path='/projects' element={<Projects />} />
            <Route path='/blog' element={<Blog />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
        </Route>
    </>
))

export default router