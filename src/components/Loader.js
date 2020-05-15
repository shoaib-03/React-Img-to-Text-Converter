import React from "react";

function Loader({ loadingText }) {
  return (
    <div className="wrapper loading-wrapper">
      <div className="loading"></div>
      <p className="loader">{loadingText}</p>
    </div>
  );
}

export default Loader;
