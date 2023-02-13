import React from 'react'
import { useNavigate } from 'react-router-dom'

function About() {

    let navigate = useNavigate()

  return (
    <div>
        <p>This is the About Page</p>
        <button onClick={() => navigate("/", {state: "From the about page"})}>Redirect</button>
    </div>
  )
}

export default About