import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

const Layout = () => {
  return (
    <>
      <div>
        <header className='w-screen border h-16 flex items-center justify-center'>
          <Navbar />
        </header>
        <main className='w-screen border h-[80svh] flex items-center justify-center'>
          <Outlet />
        </main>
        <footer className='w-screen border h-16 flex items-center justify-center'>
          <Footer />
        </footer>
      </div >
    </>
  )
}

export default Layout