"use client";
import React from "react";
import { useState } from "react";

function ResultJson({ metricConstants, setBuffer }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="gap-6 
    w-[300px] leading-6 
    md:w-[400px] md:leading-7
    lg:w-[500px] 
    xl:w-[800px] 
    
    mx-auto flex flex-col items-start">
      <div className="flex flex-row items-center gap-4">
        <button
          className="border-2 border-transparent hover:border-neutral-600 bg-neutral-800 font-mono w-10 h-10"
          onClick={() => setCollapsed((state) => !state)}
        >
          {collapsed ? "+" : "-"}
        </button>
        <button
          className="border-2 border-transparent hover:border-neutral-600 bg-neutral-800 font-mono w-10 h-10 flex flex-row items-center justify-center"
          onClick={() => {
            navigator.clipboard.writeText(
              JSON.stringify(metricConstants, null, 2)
            );
            setBuffer((state) => [
              ...state,
              {
                type: "success",
                message: "Copied to clipboard",
              },
            ]);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#fff"
            viewBox="0 0 256 256"
          >
            <path d="M184,64H40a8,8,0,0,0-8,8V216a8,8,0,0,0,8,8H184a8,8,0,0,0,8-8V72A8,8,0,0,0,184,64Zm-8,144H48V80H176ZM224,40V184a8,8,0,0,1-16,0V48H72a8,8,0,0,1,0-16H216A8,8,0,0,1,224,40Z"></path>
          </svg>
        </button>
      </div>
      {!collapsed && (
        <div className="font-mono text-start bg-neutral-950 w-full">
          <pre className="text-white text-xs md:text-sm lg:text-base xl:text-lg">
            {JSON.stringify(metricConstants, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ResultJson;
