import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home({ login }) {

    let navigate = useNavigate()
    
  return (
    <div>
    <p>This is the Home Page</p>
    <button onClick={() =>{
        login();
        navigate('/dashboard')
    }}>
        login
    </button>
    {/* {location.state} */}
    </div>
  )
}

export default Home