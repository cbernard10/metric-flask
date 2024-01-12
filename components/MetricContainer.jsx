"use client";
import React from "react";
import { useState } from "react";
import ResultJson from "./ResultJson";
import Log from "./Log";

import get from "../services/metricService";
import { add } from "mathjs";

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

function focusArea(name) {
  document.getElementById(name).focus();
}

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);
  const [buffer, setBuffer] = useState([]);

  const log = (message, type) => {
    setBuffer((state) => [
      ...state,
      {
        type,
        message,
      },
    ]);
  };

  const addValue = async (name, partial_derivatives) => {
    try {
      const res = await get(name, entries, coordinates, partial_derivatives);
      setMetricConstants((state) => ({ ...state, ...res }));
      log(`computed ${name}`, "success");
      return res;
    } catch (error) {
      log(`error computing ${name}`, "error");
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    log("connecting to server", "success");
    console.log("entries", entries);

    setMetricConstants({});

    await addValue("trace");
    await addValue("determinant");
    try {
      await addValue("inverse");
    } catch (error) {
      log("cannot inverse matrix: determinant is 0", "error");
    }
    const partial_derivatives = await addValue("partial_derivatives");
    await addValue("christoffel_1", partial_derivatives.partial_derivatives);
    try {
      await addValue("christoffel_2", partial_derivatives.partial_derivatives);
    } catch (error) {
      log("error computing christoffel symbols of the second kind: metric is not invertible", "error");
    }
  };

  return (
    <div className="flex xl:flex-row flex-col gap-12 py-16 lg:py-36 min-h-screen items-center xl:items-start">
      <div className="flex flex-col gap-6 xl:items-end items-center">
        <div className="flex flex-col gap-6 ">
          <form className="bg-black flex flex-row gap-4 items-center justify-between">
            <label>Coordinates</label>
            <div className="flex flex-row">
              {coordinates.map((coordinate, index) => {
                return (
                  <input
                    className="w-16 border-[1px] py-2 border-neutral-600 bg-neutral-900 flex justify-center items-center text-center font-mono"
                    key={index}
                    type="text"
                    value={coordinate}
                    onChange={(e) => {
                      const newCoordinates = [...coordinates];
                      newCoordinates[index] = e.target.value;
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
            <div className="grid grid-cols-3 grid-rows-3 w-[300px] h-[300px] lg:h-[400px] lg:w-[400px] xl:h-[500px] xl:w-[500px] border-2 border-neutral-600">
              {entries.map((entry, index) => {
                return (
                  <div
                    key={index}
                    onClick={() => focusArea(index)}
                    className="
                border-2 border-neutral-600 bg-neutral-900 flex flex-row justify-center 
                items-center text-center font-mono resize-none break-all h-full outline-none focus:bg-violet-950
                focus-within:bg-violet-950 overflow-clip hover:cursor-text
              "
                  >
                    <textarea
                      className="bg-transparent text-white outline-none lg:text-lg placeholder:text-neutral-600"
                      onInput={(e) => auto_grow(e.target)}
                      type="text"
                      id={index}
                      value={entry.toLowerCase()}
                      // defaultValue={!entry && index % 4 === 0 ? 1 : 0}
                      placeholder={!entry && index % 4 === 0 ? 1 : 0}
                      onChange={(e) => {
                        const newEntries = [...entries];
                        newEntries[index] = e.target.value;
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
        <Log buffer={buffer}></Log>
      </div>

      <ResultJson metricConstants={metricConstants} setBuffer={setBuffer} />
    </div>
  );
}

export default MetricContainer;
