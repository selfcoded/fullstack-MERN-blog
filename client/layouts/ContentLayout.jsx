import React from 'react'
import { Header } from '../components/Header'
import { Outlet } from 'react-router-dom'

export const ContentLayout = () => {
  return (
    <div>
        <Header />
        <Outlet />
    </div>
  )
}
