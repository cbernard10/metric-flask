"use client";
import React from "react";
import { useState } from "react";

import get from "***REMOVED******REMOVED***/services/metricService";

function auto_grow(element) {
  element***REMOVED***style***REMOVED***height = "5px";
  element***REMOVED***style***REMOVED***height = (element***REMOVED***scrollHeight) + "px";
}

function focusArea(name) {
  document***REMOVED***getElementById(name)***REMOVED***focus();
}

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9)***REMOVED***fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);

  const [collapsed, setCollapsed] = useState(false);

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
    <div className="flex flex-row gap-12 py-72 min-h-screen">
      <div className="flex flex-col gap-6 ">
        <form className="bg-black flex flex-row gap-4 items-center justify-between">
          <label>Coordinates</label>
          <div className="flex flex-row">
            {coordinates***REMOVED***map((coordinate, index) => {
              return (
                <input
                  className="w-16 border-[1px] py-2 border-neutral-600 bg-neutral-900 flex justify-center items-center text-center font-mono"
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
          <div className="grid grid-cols-3 grid-rows-3 w-[500px] h-[500px] border-2 border-neutral-600">
            {entries***REMOVED***map((entry, index) => {
              return (
                <div
                  key={index} onClick={() => focusArea(index)}
                  className="
                border-2 border-neutral-600 bg-neutral-900 flex flex-row justify-center 
                items-center text-center font-mono resize-none break-all h-full outline-none focus:bg-violet-950
                focus-within:bg-violet-950 overflow-clip hover:cursor-text
              "
                >
                  <textarea className="bg-transparent text-white outline-none text-lg" onInput={(e) => auto_grow(e***REMOVED***target)}
                    type="text"
                    id={index}
                    value={entry}
                    onChange={(e) => {
                      const newEntries = [***REMOVED******REMOVED******REMOVED***entries];
                      newEntries[index] = e***REMOVED***target***REMOVED***value;
                      setEntries(newEntries);
                    }}
                  ></textarea>
                </div>
              );
            })}
          </div>
          <button
            type="submit"
            className="border-2 border-purple-950 rounded-lg px-6 py-2 bg-gradient-to-tr from-purple-950 to-purple-800
          hover:from-purple-800 hover:to-purple-950 hover:border-purple-800 self-end"
          >
            Compute
          </button>
        </form>
      </div>

      <div className="gap-6 w-[800px] mx-auto flex flex-col">
        <button
          className="self-end border-2 border-transparent hover:border-neutral-600 bg-neutral-800 font-mono w-10 h-10"
          onClick={() => setCollapsed((state) => !state)}
        >
          {collapsed ? "+" : "-"}
        </button>
        {!collapsed && (
          <div className="font-mono text-start">
            <pre className="text-white">
              {JSON***REMOVED***stringify(metricConstants, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default MetricContainer;
