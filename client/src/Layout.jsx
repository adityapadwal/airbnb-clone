import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className='p-4 flex flex-col min-h-screen'>
        <Header />
        <Outlet />
    </div>
  )
}