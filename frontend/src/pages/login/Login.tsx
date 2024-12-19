import { FormEvent, SyntheticEvent, useContext, useState } from "react"
import { authContext } from "../../App"
import "./Login.css"
import axios from "axios"

function Login() {
  const auth = useContext(authContext)
  
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    console.log("Login!")
    if(!username){
      alert("Please enter a username")
      return;
    }
    if(!password){
        alert("Please enter a password")
        return;
    }
    //send request
    axios.post("http://localhost:8080/login",{username,password},
        {withCredentials:true}
        //allows the JSESSION cookie to be sent, needs when require session
    ).then((res) => {
        console.log(res.data)
        if (auth) {
          auth.setUsername(res.data.username)
          auth.setRole(res.data.role)
          alert("login success")
        }
    })
  }
  
  function togglePassword() {
    setShowPassword((prev) => !prev)
  }
  return (
    <div className ="form-container">
      <h2 className="form-title">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="input-sec" id="username" type="text" 
            onChange={(e:SyntheticEvent)=>{setUsername((e.target as HTMLInputElement).value)}}/>
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="input-sec" type={showPassword ? 'text' :'password'} id="password"
            onChange={(e:SyntheticEvent)=>{setPassword((e.target as HTMLInputElement).value)}}/>
            
        </div>
        <button className="show-password" type="button" onClick = {togglePassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
        <br/>
        <button type="submit" className="login-btn">Login</button>
    </form>
    </div>
  )
}

export default Login
