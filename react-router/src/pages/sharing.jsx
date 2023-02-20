import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../Firebase";
import { v4 } from "uuid";
import Navbar from "./Navbar";

function Share() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const { senddingemail } = useParams();

  const imagesListRef = ref(storage, `images/`);
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (!imageUrls.includes(url)) {
          setImageUrls((prev) => [...prev, url]);
        }
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef)
      .then((response) => {
        const promises = response.items.map((item) =>
          getDownloadURL(item).then((url) => url)
        );

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
          <img
            key={index}
            src={url}
            className="image"
            onClick={handleImageClick}
          />
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
