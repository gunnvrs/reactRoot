import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, auth } from "../Firebase";
import { v4 } from "uuid";
import Navbar from "./Navbar";

function Share() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
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
      uploadedBy: currentUser.displayName
    }).then(() => {
      const storageRef = ref(storage, `images/${fileName}`);
      uploadBytes(storageRef, imageUpload).then(() => {
        getDownloadURL(storageRef).then((url) => {
          if (!imageUrls.includes(url)) {
            setImageUrls((prev) => [...prev, url]);
          }
        });
      });
    });
  };

  useEffect(() => {
    getDocs(imagesCollectionRef)
      .then((querySnapshot) => {
        const promises = querySnapshot.docs.map((doc) => {
          const storageRef = ref(storage, `images/${doc.data().name}`);
          return getDownloadURL(storageRef);
        });

        Promise.all(promises).then((urls) => {
          setImageUrls(urls);
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
        {/* <sharemainname>Share</sharemainname> */}
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}> Upload Image</button>
        {imageUrls.map((url, index) => (
          <div key={index}>
            <img src={url} className="image" onClick={handleImageClick} />
            <p>Added by: {uploadedBy}</p>
          </div>
        ))}
        {/* {imageUrls.map((url, index) => {
          

          return <img key={index} src={url} />;

        })} */}


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