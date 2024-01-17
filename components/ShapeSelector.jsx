import React from "react";

function ShapeSelector({
  entries,
  setShape,
  setCoordinates,
  setEntries,
  setMetricConstants,
}) {
  return (
    <div className="flex flex-row justify-end items-center gap-6">
      <div className="flex flex-row">
        {[2, 3, 4].map((dimension, index) => {
          return (
            <button
              key={index}
              id={`shape-${dimension}`}
              className={`${
                entries.length === dimension ** 2
                  ? "bg-violet-700"
                  : "bg-neutral-800"
              } w-10 h-10 flex flex-row items-center justify-center border-2 border-transparent hover:border-neutral-600`}
              onClick={() => {
                setShape(dimension);
                setCoordinates(["x", "y", "z", "t"].slice(0, dimension));
                setEntries(Array(dimension ** 2).fill(""));
                setMetricConstants({});
              }}
            >
              {dimension}x{dimension}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShapeSelector;
