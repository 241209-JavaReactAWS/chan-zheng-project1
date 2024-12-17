import { Link } from "react-router-dom"
import "./Signup.css"

function Signup() {
  return (
    <div className="form-container">
        <h2 className="form-title">Sign up Account</h2>
        <form>
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input className="input-sec" id="username"/>
            </div>
    
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="input-sec" id="password"/>
                
            </div>
            <button className="show-password">showPassword</button>
            <div className="form-group">
                <label htmlFor="confirm-pawwsord">Comfirm Password</label>
                <input className="input-sec" id="confirm-pawwsord"/>
            </div>
    
            <div>
                <button className="signup-btn">Sign up</button>
            </div>
        </form>
        
        <div className="login-link">
            <Link to="/login">Already have an Account? Login</Link>
        </div>
    </div>
  )
}

export default Signup
