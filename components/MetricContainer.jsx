"use client";
import React from "react";
import { useState } from "react";

import get from "***REMOVED******REMOVED***/services/metricService";

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9)***REMOVED***fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);

  const handleSubmit = async (e) => {
    e***REMOVED***preventDefault();
    console***REMOVED***log("entries", entries);
    const trace = await get("trace", entries);
    setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, ***REMOVED******REMOVED******REMOVED***trace }));
    const determinant = await get("determinant", entries);
    setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, ***REMOVED******REMOVED******REMOVED***determinant }));
    console***REMOVED***log(determinant);
    if (determinant***REMOVED***determinant === "0") {
      setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, inverse: null }));
    } else {
      const inverse = await get("inverse", entries);
      setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, ***REMOVED******REMOVED******REMOVED***inverse }));
    }
    const transpose = await get("transpose", entries);
    setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, ***REMOVED******REMOVED******REMOVED***transpose }));
    const diffMatrix = await get("diffMatrix", entries, coordinates);
    setMetricConstants((state) => ({ ***REMOVED******REMOVED******REMOVED***state, ***REMOVED******REMOVED******REMOVED***diffMatrix }));
  };

  return (
    <div className="flex flex-row gap-12">
      <div className="flex flex-col gap-6">
        <form className="bg-black flex flex-row gap-4 items-center justify-between">
          <label>Coordinates</label>
          <div className="flex flex-row">
            {coordinates***REMOVED***map((coordinate, index) => {
              return (
                <input
                  className="w-16 border-[1px] py-2 border-white bg-neutral-900 flex justify-center items-center text-center"
                  key={index}
                  type="text"
                  value={coordinate}
                  onChange={(e) => {
                    const newCoordinates = [***REMOVED******REMOVED******REMOVED***coordinates];
                    newCoordinates[index] = e***REMOVED***target***REMOVED***value;
                    setCoordinates(newCoordinates);
                  }}
                ></input>
              );
            })}
          </div>
        </form>

        <form
          className="flex flex-col gap-4 items-center"
          onSubmit={handleSubmit}
        >
          <div className="grid grid-cols-3 grid-rows-3 border-2 border-white w-[500px] h-[500px]">
            {entries***REMOVED***map((entry, index) => {
              return (
                <input
                  className="
                    border-2 border-white bg-neutral-900 flex flex-row justify-center 
                    items-center text-center text-xl font-mono resize-none break-all h-full
                  "
                  key={index}
                  type="text"
                  value={entry}
                  onChange={(e) => {
                    const newEntries = [***REMOVED******REMOVED******REMOVED***entries];
                    newEntries[index] = e***REMOVED***target***REMOVED***value;
                    setEntries(newEntries);
                  }}
                ></input>
              );
            })}
          </div>
          <button type="submit">Compute</button>
        </form>
      </div>

      <div className="grid grid-cols-1 items-center justify-center text-center gap-6 max-w-[800px] mx-auto">
        <div className="font-mono text-start">
          <pre className="text-white">
            {JSON***REMOVED***stringify(metricConstants, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}

export default MetricContainer;
