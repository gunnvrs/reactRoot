import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { Navigate, useNavigate } from "react-router-dom";




const firebaseConfig = {
  apiKey: "AIzaSyAHBBx5buvkempJoiAXQZBGwVAAOYZH3cw",
  authDomain: "itzwebapp.firebaseapp.com",
  projectId: "itzwebapp",
  storageBucket: "itzwebapp.appspot.com",
  messagingSenderId: "368927960084",
  appId: "1:368927960084:web:79e207d2bbe32ad0784b01"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const storage = getStorage(app);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const name = result.user.displayName;
      const email = result.user.email;
      const profilePic = result.user.photoURL;
    

      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
      localStorage.setItem("profilePic", profilePic);
    })
    .catch((error) => {
      console.log(error);
    });
  
};
