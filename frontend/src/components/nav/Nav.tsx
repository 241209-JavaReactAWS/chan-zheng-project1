import { Link } from "react-router-dom"
import "./Nav.css"

function Nav() {
  return (
    <div>
        <nav>
        <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Sign up</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/admin">Admin</Link></li>
        </ul>
    </nav>
    </div>
  )
}

export default Nav

