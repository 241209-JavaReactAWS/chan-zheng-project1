import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/nav/Nav'
import Footer from './components/footer/Footer'
import About from './pages/about/About'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'
import Logo from './components/logo/Logo'

function App() {
  

  return (
    <div className="app-container">
    <BrowserRouter>
      <header> 
        <Logo />
        <Nav />
      </header>
      <main>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route path="/" element={<About />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="/login" element={<Login />}/>
      </Routes>
      </main>
      <Footer />
      </BrowserRouter>  
    </div>
  )
}

export default App
