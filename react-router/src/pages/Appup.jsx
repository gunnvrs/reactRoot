import { useState, useEffect } from "react";
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

function Appup() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "imagess/");
  const uploadFile = () => {
    if (imageUpload == null) return;
  
    const imageRef = ref(storage, `imagess/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        if (!imageUrls.includes(url)) {
          setImageUrls((prev) => [...prev, url]);
        }
      });
    });
  };

  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      const promises = response.items.map((item) =>
        getDownloadURL(item).then((url) => url)
      );
  
      Promise.all(promises).then((urls) => {
        setImageUrls(urls);
      });
    });
  }, []);
  

  return (
    <div className="mainup">
      <div className="App">
        <input
          type="file"
          onChange={(event) => {
            setImageUpload(event.target.files[0]);
          }}
        />
        <button onClick={uploadFile}> Upload Image</button>
        {imageUrls.map((url, index) => {
          return <img key={index} src={url} />;
        })}
  
        <title>Itzmine App</title>
  
        <mainname>ItzMine</mainname>
        <mainfav>Favorite</mainfav>
        <mainarch>Archive</mainarch>
        <maincover></maincover>
        <mainline></mainline>
      </div>
    </div>
  );
  
}

export default Appup;