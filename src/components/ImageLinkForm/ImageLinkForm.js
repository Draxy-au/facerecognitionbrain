import React from "react";

import "./ImageLinkForm.css";

const ImageLinkForm = () => {
  return (
    <div>
      <div className="center">
        <p className="zin white f3 center">
          {"Detect faces in your pictures. Give it a try!"}
        </p>
      </div>
      <div className="center">
        <div className="center form pa4 br3 shadow-5 carbon zin">
          <input className="f4 pa2 w-70 center zin" type="text" />
          <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple zin">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
