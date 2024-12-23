import { Link, useNavigate } from "react-router-dom"
import "./Signup.css"
import axios from "axios"
import { SyntheticEvent, useState } from "react"

function Signup() {
    const [username, setUsername] = useState<string>('')
    const [role, setRole] = useState<string>('') 
    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const navigate = useNavigate()

    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault()
        console.log("Sign up!")
        if (!username) {
            alert("Please enter a username")
            return;
        }
        if (!password) {
            alert("Please enter a password")
            return;
        }
        if (password !== confirmPassword) {
            alert("Password is different from confirmation password, please check!")
            return;
        }
        
        try {
            const res = await axios.post("http://localhost:8080/register", { username, password, role },
                { withCredentials: true });
            console.log(res.data);
            console.log("Registration successful!")
            navigate('/login')

        } catch (error: any) {
            alert(`Registration failed: ${error.response.data.message || 'Unknown error'}`)
        }
    }

    const togglePassword = (e: SyntheticEvent) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    return (
        <div className="form-container">
            <h2 className="form-title">Sign up Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="input-sec" id="username"
                        onChange={(e: SyntheticEvent) => { setUsername((e.target as HTMLInputElement).value) }} />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <select className="input-sec" id="role"
                        onChange={(e: SyntheticEvent) => { setRole((e.target as HTMLSelectElement).value) }}>
                        <option value="ADMIN">Admin</option>
                        <option value="USER">User</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="input-sec" id="password"
                        type={showPassword ? "text" : "password"}
                        onChange={(e: SyntheticEvent) => { setPassword((e.target as HTMLInputElement).value) }} />

                </div>
                <button className="show-password" onClick={togglePassword}>{showPassword ? "Hide Password" : "Show Password"}</button>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input className="input-sec" id="confirm-password"
                        type="password"
                        onChange={(e: SyntheticEvent) => { setConfirmPassword((e.target as HTMLInputElement).value) }} />
                </div>

                <div>
                    <button type="submit" className="signup-btn">Sign up</button>
                </div>
            </form>

            <div className="login-link">
                <Link to="/login">Already have an Account? Login</Link>
            </div>
        </div>
    )
}

export default Signup
