import React from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { useState } from "react";

function ToolTip({ toolText = "tooltip text", size = 20 }) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <span className='w-8'>
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
        <FaCircleInfo size={size} />
      </span>
      {isHovered && (
        <div className=' absolute bg-[rgba(0,0,0,0.8)] text-white p-2 rounded-md shadow-md text-sm max-w-64'>
          {toolText}
        </div>
      )}
    </span>
  );
}

export default ToolTip;
