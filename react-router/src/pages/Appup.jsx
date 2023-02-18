import React, { useState, useEffect } from "react";
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

function ImageList({ imageUrls }) {
  const [sortedImages, setSortedImages] = useState([]);

  useEffect(() => {
    // Calculate the number of rows needed to display the images
    const numRows = Math.ceil(imageUrls.length / 3);
    
    // Create an array of empty arrays, one for each row
    const rows = Array.from({ length: numRows }, () => []);

    // Insert the images into the rows in left-to-right, top-to-bottom order
    imageUrls.forEach((url, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      rows[row][col] = url;
    });

    setSortedImages(rows);
  }, [imageUrls]);

  const handleImageClick = (event) => {
    event.target.classList.toggle("image-selected");
  };

  return (
    <>
      {sortedImages.map((row, rowIndex) => (
        <div key={rowIndex} className="image-row">
          {row.map((url, colIndex) => (
            <img
              key={colIndex}
              src={url}
              className="image"
              onClick={handleImageClick}
            />
          ))}
        </div>
      ))}
    </>
  );
}

function Appup() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const { senddingemail } = useParams();

  const imagesListRef = ref(storage, `${localStorage.getItem("name")}/`);
  const uploadFile = () => {
    if (imageUpload == null) return;

    const imageRef = ref(storage, `${localStorage.getItem("name")}/${imageUpload.name + v4()}`);
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
        <ImageList imageUrls={imageUrls} />

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

export default Appup;
