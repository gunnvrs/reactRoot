import React from 'react'
import { useNavigate } from 'react-router-dom'


function Home({ login }) {

    let navigate = useNavigate()
    
  return (
    
    <div>
    {/* <propichome> */}
    <div className="imgauthhome">
    <img src={localStorage.getItem("profilePic")} />
    </div>
    {/* </propichome> */}
    
    <button onClick={() =>{
        navigate('/login')
    }}>
        login
    </button>

    <button onClick={() =>{
        navigate('/appup')
    }}>
        continue with
    </button>

    

    
    
    {/* <coverlogin></coverlogin> */}
    </div>
  )
}

export default Home