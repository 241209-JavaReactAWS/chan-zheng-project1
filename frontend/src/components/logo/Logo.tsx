import { Link } from "react-router-dom"
import "./Logo.css"
import LogoImage from "../../assets/techLogo.png"

function Logo() {
  return (
    <div className='brand-name'>
        <Link to = "/"><h1>TechVault</h1><img src={LogoImage}></img></Link>
    </div>
  )
}

export default Logo
