import React, { useState } from 'react'

function Profile() {
    const [username,setUsername] = useState<string>("")
    
    return (
    <div className='content-container'>
        <div className='user-profile-info'>
            <p>`Dear {}</p>
            <p></p>
        </div>
        <div className='user-favourite-content'>

        </div>
      
    </div>
  )
}

export default Profile
