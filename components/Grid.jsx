import React from "react";
import { useEffect } from "react";

function Grid({ children, shape }) {

  return (
    <>
      {shape === 2 ? (
        <div className="grid grid-cols-2 grid-rows-2 w-[300px] h-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] border-2 border-neutral-600">
          {children}
        </div>
      ) : shape === 3 ? (
        <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] border-2 border-neutral-600">
          {children}
        </div>
      ) : shape === 4 ? (
        <div className="grid grid-cols-4 grid-rows-4 w-[300px] h-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] border-2 border-neutral-600">
          {children}
        </div>
      ) : (
        <> </>
      )}
    </>
  );
}

export default Grid;
