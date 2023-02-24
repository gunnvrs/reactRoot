import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import { collection, addDoc, getDocs, serverTimestamp, updateDoc, doc } from "firebase/firestore";
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
      createdAt: serverTimestamp(),
      isPinned: false // Add new field isPinned with initial value false
    }).then(() => {
      const storageRef = ref(storage, `images/${fileName}`);
      uploadBytes(storageRef, imageUpload).then(() => {
        getDownloadURL(storageRef).then((url) => {
          setImageData((prevData) => [...prevData, {url, uploadedBy: currentUser.displayName, createdAt: new Date(), isPinned: false}]); // Update state with createdAt and isPinned fields
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
            const createdAt = doc.data().createdAt ? doc.data().createdAt.toDate() : null;
            const isPinned = doc.data().isPinned || false;
            const id = doc.id; // Add id property
            return { id, url, uploadedBy, createdAt, isPinned };
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
  
  

  const handleImageClick = (event, index) => {
    event.target.classList.toggle("image-selected");
    const imageDataCopy = [...imageData];
    const image = imageDataCopy[index];
    if (image && "isPinned" in image) { // Check if image is defined and has the isPinned property
      const isPinned = !image.isPinned;
      image.isPinned = isPinned;
      const imagesCollectionRef = collection(db, "images");
      const imageDocRef = doc(imagesCollectionRef, image.id);
      console.log("Updating isPinned for image with id:", image.id);
      updateDoc(imageDocRef, { isPinned })
        .then(() => {
          console.log("isPinned updated in Firebase");
        })
        .catch((error) => {
          console.log(error);
        });
      setImageData(imageDataCopy);
    }
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
    <img 
      src={data.url} 
      className={`image ${data.isPinned ? "image-selected" : ""}`} 
      onClick={(event) => handleImageClick(event, index)} 
    />

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
