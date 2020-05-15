import React, { useRef } from "react";

function ImageWrapper({ uploadImage }) {
  let fileInput = useRef(null);

  return (
    <div className="wrapper">
      <input
        className="input-tag"
        type="file"
        ref={(e) => {
          fileInput = e;
        }}
        onChange={(e) => uploadImage(e)}
      />
      <button className="input-btn" onClick={() => fileInput.click()}>
        Upload Image
      </button>
    </div>
  );
}

export default ImageWrapper;
