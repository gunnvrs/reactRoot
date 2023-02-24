import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import { collection, addDoc, getDocs, serverTimestamp } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../Firebase";
import { v4 } from "uuid";
import Navbar from "./Navbar";

function Share() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageData, setImageData] = useState([]);
  const [uploadedBy, setUploadedBy] = useState(null);

  const { senddingemail } = useParams();

  const imagesCollectionRef = collection(db, "images");
  const storage = getStorage();

  const uploadFile = () => {
    if (imageUpload == null) return;

    const fileName = imageUpload.name + v4();
    const currentUser = auth.currentUser;

    addDoc(imagesCollectionRef, {
      name: fileName,
      uploadedBy: currentUser.displayName,
      createdAt: serverTimestamp() // Add current time
    }).then(() => {
      const storageRef = ref(storage, `images/${fileName}`);
      uploadBytes(storageRef, imageUpload).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setImageData((prevData) => [...prevData, {url, uploadedBy: currentUser.displayName, createdAt: new Date()}]); // Update state with createdAt field
        });
      });
    });
  };

  useEffect(() => {
    getDocs(imagesCollectionRef, { orderBy: "createdAt" })
      .then((querySnapshot) => {
        const promises = querySnapshot.docs.map((doc) => {
          const storageRef = ref(storage, `images/${doc.data().name}`);
          return getDownloadURL(storageRef).then((url) => {
            const uploadedBy = doc.data().uploadedBy;
            const createdAt = doc.data().createdAt ? doc.data().createdAt.toDate() : null; // Check if createdAt field exists
            return { url, uploadedBy, createdAt };
          });
        });
  
        Promise.all(promises).then((data) => {
          setImageData(data);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleImageClick = (event) => {
    event.target.classList.toggle("image-selected");
  };


  return (
    <div className="mainup">
      <Navbar />
      <div className="App">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}> Upload Image</button>
        {imageData.map((data, index) => (
          <div key={index}>
            <img src={data.url} className="image" onClick={handleImageClick} />
            {data.createdAt && <h5>Added by: {data.uploadedBy} at {data.createdAt.toLocaleString()}</h5>}

          </div>
        ))}
        <div className="imgauth">
          <a href="/myprofile">
            <img src={localStorage.getItem("profilePic")} />
          </a>
        </div>

        <title>Itzmine App</title>
        <maincover></maincover>
        <mainline></mainline>
      </div>
    </div>
  );
}

export default Share;
