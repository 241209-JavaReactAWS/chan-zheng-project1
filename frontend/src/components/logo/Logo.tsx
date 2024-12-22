import { Link } from "react-router-dom"
import "./Logo.css"
import LogoImage from "../../assets/techLogo.png"

function Logo() {
  return (
    <div className='brand-name'>
        <Link to = "/">
          <img src={LogoImage}/>
          <h1>TechVault</h1>
        </Link>
    </div>
  )
}

export default Logo
