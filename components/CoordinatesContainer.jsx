import React from "react";

function CoordinatesContainer({ coordinates }) {
  const str = coordinates.join(", ");

  return (
    <div className="flex flex-row text-lg">
      <span>[</span>
      {str}
      <span>]</span>
    </div>
  );
}

export default CoordinatesContainer;
