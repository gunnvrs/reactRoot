import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./index.scss"
import { BrowserRouter , NavLink , Routes , Route , Navigate} from 'react-router-dom'


// Pages
import Home from './pages/Home'
import About from './pages/Album'
import Contact from './pages/Contact'
import Error from './pages/Error'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Appup from './pages/Appup'
import NotFoundPage from './pages/Error'
import Share from './pages/sharing'
import Favorite from './pages/favorite'
import Album from './pages/Album'



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
    // <BrowserRouter>
    //   <header>
    //   <h1>HelloWorld</h1>
    //   </header>  
    //   <nav>
    //   <NavLink end to="/" className={( {isActive} ) => isActive ? activeClassName : undefined}>Home</NavLink>
    //   <NavLink to="/about" className={( {isActive} ) => isActive ? activeClassName : undefined}>About</NavLink>
    //   <NavLink to="/contact" className={( {isActive} ) => isActive ? activeClassName : undefined}>Contact</NavLink>
    //   <NavLink to="/dashboard">Dashboard</NavLink>
    //   <NavLink to="/login">mylogin</NavLink>
    //   </nav>
    //   <Routes>
    //     <Route path='/' element={loggedIn ?<Navigate to="/dashboard" /> : <Home login={handleLogin}/>} />
    //     <Route path='/about' element={<About />} />
    //     <Route path='/contact' element={<Contact />} />
    //     <Route path='/dashboard' element={ loggedIn ? <Dashboard logout={handleLogout} /> : <Navigate to="/" state={"From Dashboard"}/>}></Route> 
    //       <Route path='/settings' element={<p>This is the nested settings route</p>}>
    //       <Route path='/login' element={<Login />} />
    //       </Route>

    //       <Route path='/profile'>
    //         <Route path=':userId' element={<Profile />} />
    //       </Route>
          
    //     <Route path='*' element={<Error />} />
    //   </Routes>
    // </BrowserRouter>

    // <Login />
    <BrowserRouter>
    <Routes>
        <Route path="login" element={<Login/>}/>

        <Route path="/" element={<Login/>}/>
        <Route path='/appup' element={<Appup/>}/>
        <Route path='*' element={<Error/>}/>
        <Route path='/sharing' element={<Share/>}/>
        <Route path='/favorite' element={<Favorite/>}/>
        <Route path='/myprofile' element={<Profile/>}/>
        <Route path='/album' element={<Album/>}/>
      
    </Routes>
    </BrowserRouter>
  )
}

export default App
