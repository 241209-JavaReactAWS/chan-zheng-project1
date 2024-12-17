import "./Login.css"

function Login() {
  return (
    <div className ="form-container">

    <h2 className="form-title">Login Account</h2>
    <form>

        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="input-sec" id="username"/>
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="input-sec" type='password' id="password"/>
            
        </div>
        <button className="show-password">showPassword</button>
        <br/>
        <button className="login-btn">Login</button>
    </form>
    </div>
  )
}

export default Login
