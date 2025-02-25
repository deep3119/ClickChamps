import React from "react";
import "./Loader.css"; 

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="dot-loader"></div>
      <div className="dot-loader dot-loader-delay-1"></div>
      <div className="dot-loader dot-loader-delay-2"></div>
    </div>
  );
};

export default Loader;