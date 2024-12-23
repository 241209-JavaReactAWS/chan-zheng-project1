import { SyntheticEvent, useState, useContext } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../App";

function Login() {
  const auth = useContext(authContext)
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false); 
  const [errorMessage, setErrorMessage] = useState<string>('');  
  const navigate = useNavigate();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert("Please enter both a username and password.");
      return;
    }

    try {
      setLoading(true); 
      setErrorMessage(''); 
      const res = await axios.post("http://localhost:8080/login", { username, password }, { withCredentials: true });
      if(auth) {
        auth.setUsername(res.data.username)
        auth.setRole(res.data.role)
        console.log(res.data);
        console.log("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      setLoading(false);  
      setErrorMessage('Login failed. Please check your credentials and try again.');
      console.error("Login failed:", error);
    }
  };

  function togglePassword() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Login Account</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            className="input-sec"
            id="username"
            type="text"
            value={username}
            onChange={(e: SyntheticEvent) => { setUsername((e.target as HTMLInputElement).value); }}
            disabled={loading} 
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            className="input-sec"
            type={showPassword ? 'text' : 'password'}
            id="password"
            value={password}
            onChange={(e: SyntheticEvent) => { setPassword((e.target as HTMLInputElement).value); }}
            disabled={loading}
          />
        </div>

        <button className="show-password" type="button" onClick={togglePassword} disabled={loading}>
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <br />
        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? 'Logging In...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
