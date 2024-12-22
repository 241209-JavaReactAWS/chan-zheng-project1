import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { createContext } from 'react'
import { useUserAuth } from './components/UserAuth'

import About from './pages/about/About'
import Home from './pages/home/Home'
import Shop from './pages/shop/Shop'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Profile from './pages/profile/Profile'

import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import Logo from './components/logo/Logo' 

import './App.css'

export interface AuthContextType {
  username: string
  setUsername: (username: string) => void
  role: 'unauth' | 'USER' | 'ADMIN'
  setRole: (role: 'unauth' | 'USER' | 'ADMIN') => void;
}

export const authContext = createContext<AuthContextType | null>(null)

function App() {
  
  const { username, setUsername, role, setRole } = useUserAuth()

  return (
    <div className="app-container">
      <authContext.Provider value = {{username, setUsername, role, setRole}}>
        <BrowserRouter>
          <header> 
            <Logo />
            <Nav />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/shop" element={<Shop />}/>
              <Route path="/about" element={<About />}/>
              <Route path="/signup" element={<Signup />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/profile" element={<Profile/>}/>
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>  
    </authContext.Provider>
    </div>
  )
}

export default App
