"use client";
import React from "react";
import { useState } from "react";
import ResultJson from "./ResultJson";
import Log from "./Log";
import CoordinatesForm from "./CoordinatesForm";
import MetricForm from "./MetricForm";

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);
  const [buffer, setBuffer] = useState([]);
  const [shape, setShape] = useState(3);

  return (
    <div className="flex xl:flex-row flex-col gap-12 py-4 lg:py-20 min-h-screen items-center xl:items-start">
      <div className="flex flex-col gap-6 xl:items-end items-center">
        <div className="flex flex-col gap-6 ">
          <div className="flex flex-row justify-end items-center gap-6">
            <span>Shape</span>
            <div className="flex flex-row">
              {[2, 3, 4].map((dimension, index) => {
                return (
                  <button
                    key={index}
                    id={`shape-${dimension}`}
                    className={`${
                      entries.length === dimension ** 2
                        ? "bg-purple-700"
                        : "bg-neutral-800"
                    } w-10 h-10 flex flex-row items-center justify-center border-2 border-transparent hover:border-neutral-600`}
                    onClick={() => {
                      setShape(dimension);
                      setCoordinates(["x", "y", "z", "t"].slice(0, dimension));
                      setEntries(Array(dimension ** 2).fill(""));
                    }}
                  >
                    {dimension}
                  </button>
                );
              })}
            </div>
          </div>

          <CoordinatesForm
            coordinates={coordinates}
            setCoordinates={setCoordinates}
          />
          <MetricForm
            entries={entries}
            setEntries={setEntries}
            setMetricConstants={setMetricConstants}
            setBuffer={setBuffer}
            coordinates={coordinates}
            shape={shape}
          />
        </div>
        <Log buffer={buffer}></Log>
      </div>

      <ResultJson metricConstants={metricConstants} setBuffer={setBuffer} />
    </div>
  );
}

export default MetricContainer;
