import React from "react";

const Rank = ({name,rank}) => {
  return (
    <div>
      <div className="white f3 center">
        <p className="zin">{`${name}, your entry count is...`}</p>
      </div>
      <div className="white f1 center">
        <p className="zin">{rank}</p>
      </div>
    </div>
  );
};

export default Rank;
