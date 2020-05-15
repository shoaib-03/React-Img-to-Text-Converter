import React, { useState, useEffect } from "react";
import axios from "axios";
import Tesseract from "tesseract.js";

import "./App.css";
import ImageWrapper from "./components/ImageWrapper";
import TextWrapper from "./components/TextWrapper";
import Loader from "./components/Loader";

function App() {
  const [imageURL, setImageURL] = useState(undefined);
  const [text, setText] = useState("");
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [isProcessed, setProcessed] = useState(false);
  const [loaderText, setLoaderText] = useState("uploading image...");

  const uploadImage = (e) => {
    setLoadingStatus(true);

    const file = e.target.files[0];

    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("upload_preset", "image-converter");

      const config = {
        headers: { "X-Requested-With": "XMLHttpRequest" },
      };

      axios
        .post(
          "https://api.cloudinary.com/v1_1/my-cloud-ss/image/upload",
          fd,
          config
        )
        .then((result) => {
          setImageURL(result.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const convertImage = (url) => {
    setLoaderText("processing image... please wait!");
    Tesseract.recognize(url, "eng").then((result) => {
      setText(result.data.text);
      setLoadingStatus(false);
      setProcessed(true);
    });
  };

  useEffect(() => {
    if (imageURL) {
      convertImage(imageURL);
    }
  }, [imageURL]);

  const convertAgain = () => {
    setImageURL(undefined);
    setText("");
    setLoadingStatus(false);
    setProcessed(false);
    setLoaderText("uploading image...");
  };

  return (
    <div className="App">
      <div className="logo">
        <h1>Light Converter</h1>
        <p>convert image to text</p>
      </div>
      <div className="container">
        {loadingStatus ? (
          <Loader loadingText={loaderText} />
        ) : isProcessed ? (
          <TextWrapper text={text} />
        ) : (
          <ImageWrapper uploadImage={uploadImage} />
        )}
      </div>
      {isProcessed ? (
        <div className="restart">
          <button onClick={convertAgain}>Convert Again</button>
        </div>
      ) : null}
    </div>
  );
}

export default App;
