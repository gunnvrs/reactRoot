import React from 'react'
import { Outlet , Link } from 'react-router-dom'

function Dashboard({ logout }) {
  return (
    <div>
        <h3>Dashboard</h3>
        <Link to ="/settings">Settings</Link>
        <Outlet />
        <p>Welcome User</p>
        <button onClick={logout}>Logout</button>
    </div>
  )
}

export default Dashboard