import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter , NavLink , Routes , Route , Navigate} from 'react-router-dom'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

function App() {
  const [loggedIn, setLoggedIn] = useState(null)

  function handleLogin() {
    setLoggedIn(true)
  }

  function handleLogout() {
    setLoggedIn(false)
  }

  console.log(loggedIn)

  let activeClassName = "nav-active"

  return (
    <BrowserRouter>
      <header>
      <h1>HelloWorld</h1>
      </header>  
      <nav>
      <NavLink end to="/" className={( {isActive} ) => isActive ? activeClassName : undefined}>Home</NavLink>
      <NavLink to="/about" className={( {isActive} ) => isActive ? activeClassName : undefined}>About</NavLink>
      <NavLink to="/contact" className={( {isActive} ) => isActive ? activeClassName : undefined}>Contact</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
      </nav>
      <Routes>
        <Route path='/' element={loggedIn ?<Navigate to="/dashboard" /> : <Home login={handleLogin}/>} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/dashboard' element={ loggedIn ? <Dashboard logout={handleLogout} /> : <Navigate to="/" state={"From Dashboard"}/>}></Route> 
          <Route path='/settings' element={<p>This is the nested settings route</p>}>
          </Route>

          <Route path='/profile'>
            <Route path=':userId' element={<Profile />} />
          </Route>
          
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
