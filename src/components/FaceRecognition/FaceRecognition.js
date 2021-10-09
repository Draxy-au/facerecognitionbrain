import React from "react";

import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {

  let boxes = box.map( (bb, i) => {
    return (
      <div
      key={i}
      className="bounding-box"
      style={{
        top: bb.top,
        right: bb.right,
        left: bb.left,
        bottom: bb.bottom,
      }}
    ></div>
    );
  })

  return (
    <div className="pt2 center imagecontainer">
      <img id="inputImg" alt="" src={imageUrl} />
      <div>
        {boxes}
      </div>
    </div>
  );
};

export default FaceRecognition;
