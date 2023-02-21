import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { signInWithGoogle } from "../Firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
  deleteObject,
} from "firebase/storage";
import { storage } from "../Firebase";
import { v4 } from "uuid";
import Navbar from "./Navbar";

function Favorite() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const { senddingemail } = useParams();

  const imagesListRef = ref(storage, `${localStorage.getItem("name")}fav/`);

  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(
      storage,
      `${localStorage.getItem("name")}fav/${imageUpload.name}`
      
    );
    console.log('imageRef', imageRef);

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
    const url = event.target.src;
    const name = decodeURIComponent(url.substring(url.lastIndexOf('/') + 1));
    if (selectedImage !== url) {
      setSelectedImage(url);
    } else {
      setSelectedImage(null);
    }
    if (!imageUrls.some((obj) => obj.url === url)) {
      setImageUrls((prev) => [...prev, { name, url }]);
    }
  };
  
  
  
  const handleDeleteClick = () => {
    if (selectedImage == null) {
      return;
    }
  
    const imageName = imageUrls.find((obj) => obj.url === selectedImage).name;
    const imageNameWithoutParams = imageName.replace(/(\?.*)|(\/media)/g, '');
    const imageRef = ref(storage, `${imageNameWithoutParams}`);
  
    deleteObject(imageRef)
      .then(() => {
        setSelectedImage(null);
        setImageUrls(prevUrls => prevUrls.filter(url => url !== selectedImage));
      })
      .catch((error) => {
        console.log(error);
      });
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
        {imageUrls.map((url, index) => (
          <div key={index} className="image-container">
            <img
              src={url}
              className={`image ${selectedImage === url ? "image-selected" : ""}`}
              onClick={handleImageClick}
            />
            {selectedImage === url && (
              <button className="delete-button" onClick={handleDeleteClick}>
                Delete
              </button>
            )}
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

export default Favorite;