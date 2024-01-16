import React from "react";
import MiniArray from "./MiniArray";
import { strToArr } from "../../lib/util";

function InverseView({ inverse, coordinates }) {
  const coord = coordinates[0];
  return (
    <div className="">
      <span className="text-xl font-bold">inverse</span>

      <div className="flex flex-row">
        {[coordinates[0]].map((coordinate, index) => {
          return (
            <button
              key={index}
              className={`${
                coord === coordinate ? "bg-purple-700" : "bg-neutral-800"
              } w-10 h-10 flex flex-row items-center justify-center border-2 border-transparent hover:border-neutral-600`}
            >
              {coordinate}
            </button>
          );
        })}
      </div>
      <MiniArray entries={strToArr(inverse)} />
    </div>
  );
}

export default InverseView;
