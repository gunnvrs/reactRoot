import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";

function Login() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userId = result.uid;
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("profilePic", user.photoURL);
        localStorage.setItem("userId", user.uid);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="mainlogin">
      <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>

      <title>login App</title>
      <line1></line1>
      <line2></line2>
      <email>email</email>
      <password>name</password>
      <h2>ItzMine</h2>

      {localStorage.getItem("email") && (
        <div>

          <googleinemail>{localStorage.getItem("email")}</googleinemail>
          <googleinname>{localStorage.getItem("name")}</googleinname>

          <div className="imgauth">
            <img src={localStorage.getItem("profilePic")} />
          </div>
          <button className="button">
          <Link to="/appup" style={{ textDecoration: "none", color: "black"  }}>
        login
        </Link>
          </button>

          <googleemailcover></googleemailcover>
          <googlenamecover></googlenamecover>
          
        </div>
        
      )}
      <coverlogin></coverlogin>
    </div>
  );
}

export default Login;
