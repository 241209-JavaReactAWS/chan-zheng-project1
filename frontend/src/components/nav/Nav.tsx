import { Link } from "react-router-dom"
import "./Nav.css"

function Nav() {
  return (
    <div>
        <nav>
        <ul>
            <li><Link to="/">home page</Link></li>
            <li><Link to="/login">login page</Link></li>
            <li><Link to="/signup">signup page</Link></li>
            <li><Link to="/landing">products page</Link></li>
            <li><Link to="/admin">admin page</Link></li>
        </ul>
    </nav>
    </div>
  )
}

export default Nav

