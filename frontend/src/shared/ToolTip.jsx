import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";

function ToolTip({ toolText = "tooltip text" }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <span
        onMouseOver={() => {
          console.log("hovered");
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          console.log("left");
          setIsHovered(false);
        }}
      >
        <FaCircleInfo />
      </span>
      {isHovered && (
        <div className='absolute bg-black text-white p-2 rounded-md shadow-md'>
          {toolText}
        </div>
      )}
    </>
  );
}

export default ToolTip;
