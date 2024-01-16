"use client";
import React from "react";
import MiniArray from "./MiniArray";
import { useState } from "react";
import { strToArr } from "../../lib/util";

function DerivativesView({ partial_derivatives, coordinates }) {
  const [coord, setCoord] = useState(coordinates[0]);

  return (
    <div className="">
      <span className="text-xl font-bold">dg/d{coord}</span>
      <div className="flex flex-row">
        {coordinates.map((coordinate, index) => {
          return (
            <button
              key={index}
              className={`${
                coord === coordinate ? "bg-purple-700" : "bg-neutral-800"
              } w-10 h-10 flex flex-row items-center justify-center border-2 border-transparent hover:border-neutral-600`}
              onClick={() => {
                setCoord(coordinate);
              }}
            >
              {coordinate}
            </button>
          );
        })}
      </div>
        <MiniArray entries={strToArr(partial_derivatives[coord])} />
    </div>
  );
}

export default DerivativesView;
