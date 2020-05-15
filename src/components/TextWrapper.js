import React from "react";

function TextWrapper({ text }) {
  return (
    <div className="wrapper">
      <textarea defaultValue={text}></textarea>
    </div>
  );
}

export default TextWrapper;
