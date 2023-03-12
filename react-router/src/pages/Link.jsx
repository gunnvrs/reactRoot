import { useState, useEffect } from "react";
import {
  serverTimestamp,
  doc,
  updateDoc,
  addDoc,
  collection,
  getDocs,
  query,
  where,
  deleteDoc
} from "firebase/firestore";
import { db, auth } from "../Firebase";
import Navbar from "./Navbar";

const Linkurl = () => {
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const name = localStorage.getItem("name");
    console.log("name:", name);
    if (name) {
      setUsername(name);
      getUrls(name);
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
        if (url.trim() === '') {
          console.log("URL cannot be empty.");
          return;
        }
        const urlsRef = collection(db, "users", username, "urls");
        console.log("urlsRef:", urlsRef);
  
        addDoc(urlsRef, {
          url: url,
          timestamp: serverTimestamp()
        })
        .then(() => {
          console.log("URL saved to Firestore.");
          setUrl("");
          getUrls(username);
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

  const handleDeleteUrl = (id) => {
    const urlsRef = collection(db, "users", username, "urls");
    const docRef = doc(urlsRef, id);
    
    updateDoc(docRef, {
      deleted: true
    })
    .then(() => {
      console.log("URL deleted from Firestore.");
      getUrls(username);
    })
    .catch((error) => {
      console.error("Error deleting URL: ", error);
    });
  };
  
  
  const getUrls = async (username) => {
    const q = query(collection(db, "users", username, "urls"));
    const querySnapshot = await getDocs(q);
    const urls = querySnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setUrls(urls);
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
        <p2>Link</p2>
        <input type="text" value={url} onChange={handleUrlChange} />
        <button onClick={handleSaveUrl}>Save</button>
        <table>
          <thead>
            <tr>
              <th>URL</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    {urls.filter((url) => !url.deleted).map((url) => (
      <tr key={url.id}>
        <td style={{ padding: "10px 20px" }}>{url.url}</td>
        <td style={{ padding: "10px 20px" }}>{url.timestamp && url.timestamp.toDate().toString()}</td>
        <td>
          <button onClick={() => handleDeleteUrl(url.id)}>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
        </table>
  
        <title>Itzmine App</title>
      </div>
      <maincover></maincover>
      <mainline></mainline>
    </div>
  );
  
};

export default Linkurl;
