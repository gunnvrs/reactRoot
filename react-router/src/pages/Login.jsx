import { Link, Navigate, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";

function refreshPage() {
//   if (signInWithGoogle)  {
    // window.location.reload();
    
    // const navigate = useNavigate()
    // navigate("/")
    console.log (signInWithGoogle.name)
//   }
}



function repage(){
  return <Navigate to="/"/>
}

function Login() {
    return (
        <div className="mainlogin">
        
        
          <button class="login-with-google-btn" onClick={signInWithGoogle}>
            Sign in with Google
          </button>
         
          
        <title>login App</title>
        <line1></line1>
        <line2></line2>
        <email>email</email>
        <password>name</password>
        <h2>ItzMine</h2>
    
        <googleemailcover></googleemailcover>
        <googlenamecover></googlenamecover>
        <button class="button" >
            <Link to="/appup">
            login 
            </Link>
          </button>
          <googleinname2>{localStorage.getItem("name")}</googleinname2>
          <googleinemail2>{localStorage.getItem("email")}</googleinemail2>
          <div className="imgauth">
          <img src={localStorage.getItem("profilePic")} />
          </div>
          <coverlogin></coverlogin>
    
        </div>
        
      );
}

export default Login;
