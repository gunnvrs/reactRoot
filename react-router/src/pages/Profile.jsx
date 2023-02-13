import React from 'react'
import { useParams } from 'react-router-dom'

function Profile() {

    let{ userId } = useParams();

  return (
    <div>
        <h3>Profile</h3>
        <p>The id of this user id is {userId}</p>
    </div>
  )
}

export default Profile