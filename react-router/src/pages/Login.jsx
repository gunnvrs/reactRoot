import { Link, useNavigate } from "react-router-dom";
import { auth, signInWithGoogle } from "../Firebase";

function Login() {
  const navigate = useNavigate();

  const handleSignInWithGoogle = () => {
    signInWithGoogle()
      .then((result) => {
        const user = result.user;
        const userId = user.uid; // get the UID from the user object
        localStorage.setItem("email", user.email);
        localStorage.setItem("name", user.displayName);
        localStorage.setItem("profilePic", user.photoURL);
        localStorage.setItem("userId", userId); // store the UID in localStorage
        navigate("/");
        // navigate("/appup"); // redirect to the appup page
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("email");
      localStorage.removeItem("name");
      localStorage.removeItem("profilePic");
      localStorage.removeItem("userId");
      navigate("/");
    });
  };

  return (
    <div className="mainlogin">
      <button className="login-with-google-btn" onClick={handleSignInWithGoogle}>
        Sign in with Google
      </button>
      {localStorage.getItem("email") ? (
        <div>
          <googleinemail>{localStorage.getItem("email")}</googleinemail>
          <googleinname>{localStorage.getItem("name")}</googleinname>
          <div className="imgauth">
            <img src={localStorage.getItem("profilePic")} />
          </div>
          <button className="button">
            <Link
              to="/appup"
              style={{ textDecoration: "none", color: "black" }}
            >
              go to app
            </Link>
          </button>
          <button onClick={handleLogout}>Logout</button>
          <googleemailcover></googleemailcover>
          <googlenamecover></googlenamecover>
        </div>
      ) : (
        <button
          className="login-with-google-btn"
          onClick={handleSignInWithGoogle}
        >
          Sign in with Google
        </button>
        
      )}
      <title>login App</title>
      <line1></line1>
      <line2></line2>
      <email>email</email>
      <password>name</password>
      <h2>ItzMine</h2>
      <coverlogin></coverlogin>

      <button
          className="login-with-google-btn2"
          onClick={handleLogout}
        >signout
        </button>

    </div>
  );
}

export default Login;
