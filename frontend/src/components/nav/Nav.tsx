import { Link, useNavigate } from "react-router-dom"
import "./Nav.css"
import { useContext } from "react"
import { authContext } from "../../App"
import axios from "axios"

function Nav() {
  const navigate = useNavigate()
  const auth = useContext(authContext)

  let logOut = () => {
    axios.post('http://localhost:8080/logout', {}, {withCredentials: true})
    .then((res) => {
      auth?.setUsername('')
      auth?.setRole('unauth')
      console.log("logged out")
      navigate('/')
    })
  }
  return (
    <div>
        <nav>
        <ul>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            {auth?.role == "unauth" ? 
            <>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/signup">Sign up</Link></li>
            </>
            :
            <>
            <li><Link to="/profile">Profile</Link></li>
            <li><button onClick={logOut}>Logout</button></li>
            </>}
        </ul>
    </nav>
    </div>
  )
}

export default Nav

