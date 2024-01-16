"use client";
import React from "react";
import MiniArray from "./MiniArray";
import { useState } from "react";
import { strToArr } from "../../lib/util";

function ChristoffelView({ christoffel_symbols, coordinates, type }) {
  const [coord, setCoord] = useState(coordinates[0]);

  return (
    <div className="">
      <span className="text-xl font-bold">Γ{type === 1 ? <sub>{coord}</sub> : <sup>{coord}</sup>}..</span>
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

      <MiniArray entries={strToArr(christoffel_symbols[coord])} />
    </div>
  );
}

export default ChristoffelView;
