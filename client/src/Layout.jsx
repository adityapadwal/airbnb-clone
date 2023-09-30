import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router'

export default function Layout() {
  return (
    <div className='py-4 px-20 flex flex-col min-h-screen'>
        <Header />
        <Outlet />
    </div>
  )
};