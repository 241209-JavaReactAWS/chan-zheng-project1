import { FormEvent, SyntheticEvent, useState } from "react"
import "./Login.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  const [showPassword,setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e:SyntheticEvent)=>{
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
    //send request
    try{
      const res = await axios.post("http://localhost:8080/login",{username,password},
      {withCredentials:true});
      //allows the JSESSION cookie to be sent, needs when require session
      console.log(res.data);
      alert("Login successful!");
      navigate("/",{ replace: true })
    } catch(error:any){
        alert(`Login failed:${error.response.data.message||'Unknown error'}`)
    }
}

  const togglePassword = (e:SyntheticEvent) =>{
    e.preventDefault();
    setShowPassword(!showPassword);
}

  return (
    <div className ="form-container">

    <h2 className="form-title">Login Account</h2>
    <form onSubmit={handleSubmit}>

        <div className="form-group">
            <label htmlFor="username">Username</label>
            <input className="input-sec" id="username" 
            onChange={(e:SyntheticEvent)=>{setUsername((e.target as HTMLInputElement).value)}}/>
        </div>

        <div className="form-group">
            <label htmlFor="password">Password</label>
            <input className="input-sec"
            type={showPassword?"text":"password"}
            id="password"
            onChange={(e:SyntheticEvent)=>{setPassword((e.target as HTMLInputElement).value)}}/>
            
        </div>
        <button className="show-password" onClick={togglePassword}>{showPassword?"Hide Password":"Show Password"}</button>
        <br/>
        <button type="submit" className="login-btn">Login</button>
    </form>
    </div>
  )
}

export default Login
