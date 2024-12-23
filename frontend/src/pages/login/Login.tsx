import { FormEvent, SyntheticEvent, useContext, useState } from "react"
import { authContext } from "../../App"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const auth = useContext(authContext)
  
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  
  const handleSubmit = async(e:SyntheticEvent) => {
    e.preventDefault()
    
    console.log("Login!")
    if(!username){
      alert("Please enter a username")
      return;
    }
    if(!password){
        alert("Please enter a password")
        return;
    }
   
    try{
      const res = await axios.post("http://localhost:8080/login",{username,password},
      {withCredentials:true});
      console.log(res.data);
      console.log("Login successful!");
      navigate("/",{ replace: true })
    } catch(error:any){
        alert(`Login failed:${error.response.data.message||'Unknown error'}`)
    }
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
