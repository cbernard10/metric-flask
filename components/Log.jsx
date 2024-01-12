import React from "react";
// import { useState } from 'react'

function Log({ buffer }) {
  return (
    <div className="flex flex-col">
      <span className="font-mono">Console</span>
      <div className="bg-gradient-to-b from-neutral-600 to-neutral-950 to-5% p-4 w-[300px] lg:w-[400px] xl:w-[500px] border-2 border-neutral-600">
        {buffer***REMOVED***slice(-10)***REMOVED***map((entry, index) => {
          return (
            <div key={index} className="flex flex-row items-center gap-2">
              <span
                className={`${
                  entry***REMOVED***type === "error" ? "bg-red-600" : "bg-emerald-600"
                } min-w-[8px] min-h-[8px] rounded-full`}
              ></span>
              <span className="text-neutral-200 font-mono text-sm lg:text-base">
                {entry***REMOVED***message}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Log;
