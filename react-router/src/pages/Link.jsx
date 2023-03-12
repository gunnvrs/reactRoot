import { useState, useEffect } from "react";
import { serverTimestamp, doc, updateDoc, addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../Firebase";
import Navbar from "./Navbar";

const Linkurl = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("name");
    console.log("name:", name);
    if (name) {
      setUsername(name);
    } else {
      console.log("User not logged in.");
    }
  }, []);

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const handleSaveUrl = () => {
    if (auth.currentUser) {
      if (username) {
        const urlsRef = collection(db, "users", username, "urls");
        console.log("urlsRef:", urlsRef);

        addDoc(urlsRef, {
          url: url,
          timestamp: serverTimestamp()
        })
        .then(() => {
          console.log("URL saved to Firestore.");
        })
        .catch((error) => {
          console.error("Error saving URL: ", error);
        });
      } else {
        console.log("User not logged in.");
      }
    } else {
      console.log("User not authenticated.");
    }
  };

  console.log("url:", url);
  console.log("username:", username);

  return (
    <div className="mainup">
      <Navbar />
      <div className="App">
        <div className="imgauth">
          <a href="/myprofile">
            <img src={localStorage.getItem("profilePic")} />
          </a>
        </div>
        <p2>Link Page</p2>
        <h4>{localStorage.getItem("name")}</h4>
        <input type="text" value={url} onChange={handleUrlChange} />
        <button onClick={handleSaveUrl}>Save</button>
        <title>Itzmine App</title>
      </div>
      <maincover></maincover>
      <mainline></mainline>
    </div>
  );
};

export default Linkurl;
