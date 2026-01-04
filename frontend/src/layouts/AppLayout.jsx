import React from 'react'
import { Outlet } from 'react-router-dom'

function AppLayout() {
  return (
    <div>
        <header>
            <h3>ContactBook</h3>
            <p>Logout</p>
            <main>
                <Outlet/>
            </main>
        </header>
    </div>
  )
}

export default AppLayout