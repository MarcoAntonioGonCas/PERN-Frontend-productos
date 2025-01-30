import React from 'react'
import { Outlet } from 'react-router'

export default function MainLayout() {
  return (
    <>
      <header className='bg-slate-800 '>
          <div className='mx-auto py-10 max-w-6xl'>
            <h1 className='text-white text-2xl font-bold p-4'>Admin Productos</h1>
          </div>
          
      </header>

      <main className='container max-w-6xl mx-auto p-10  mt-10 shadow'>
        <Outlet />
      </main>
    </>
  )
}
