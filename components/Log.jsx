import React from "react";
// import { useState } from 'react'

function Log({ buffer }) {
  return (
    <div className="bg-gradient-to-b from-neutral-600 to-neutral-950 to-5% p-6 max-w-[600px]">
      {buffer***REMOVED***slice(-10)***REMOVED***map((entry, index) => {
        return (
          <div key={index} className="flex flex-row items-center gap-2">
            <span
              className={`${
                entry***REMOVED***type === "error" ? "bg-red-600" : "bg-emerald-600"
              } min-w-[8px] min-h-[8px] rounded-full`}
            ></span>
            <span className="text-neutral-200 font-mono">{entry***REMOVED***message}</span>
          </div>
        );
      })}
    </div>
  );
}

export default Log;
