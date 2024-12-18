import { FormEvent, SyntheticEvent, useState } from "react"
import "./Login.css"
import axios from "axios"

function Login() {
  const [username,setUsername] = useState<string>('')
  const [password,setPassword] = useState<string>('')
  
  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
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
        setUsername(res.data.username)
        alert("login success")
    })
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
            <input className="input-sec" type='password' id="password"
            onChange={(e:SyntheticEvent)=>{setPassword((e.target as HTMLInputElement).value)}}/>
            
        </div>
        <button className="show-password">showPassword</button>
        <br/>
        <button type="submit" className="login-btn">Login</button>
    </form>
    </div>
  )
}

export default Login
