import { Link } from "react-router-dom"
import "./About.css"
import { useContext } from "react"
import { authContext } from "../../App"

function About() {
  const auth = useContext(authContext)
  
  return (
    <div className="main-content">
        <div className="welcome-section">
            <h1 className="welcome-title">Welcome to Techvault</h1>
        <p className="welcome-text">
           Welcome to Techvault, your ultimate hub for discovering and accessing the best online shopping destinations. 
           Explore a curated selection of shop links, compare products, and redirect effortlessly to your favorite 
           stores—all in one place!
        </p>
        </div>
        <button id="button">
          {auth?.role == "unauth" ?
          <Link to = "/login">Start Shopping</Link> :
          <Link to = "/">Start Shopping</Link>
          }
        </button>
    </div>
  )
}

export default About
