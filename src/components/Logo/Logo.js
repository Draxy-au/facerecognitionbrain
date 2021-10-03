import React from "react";

import "./Logo.css";
import Tilty from "react-tilty";

const Logo = () => {
  return (
    <div className="ma4 mt0 center">
      <Tilty className="tilty" glare scale={1.05} maxGlare={0.5}>
        <div className="inner"><span role="img" aria-label="Face Logo">🧔</span></div>
      </Tilty>
    </div>
  );
};

export default Logo;
