"use client";
import React from "react";
import { useState } from "react";
import ResultJson from "./ResultJson";
import Log from "./Log";
import CoordinatesForm from "./CoordinatesForm";
import MetricForm from "./MetricForm";
import DerivativesView from "./ResultView/DerivativesView";
import InverseView from "./ResultView/InverseView";
import ChristoffelView from "./ResultView/ChristoffelView";
import ResultView from "./ResultView/ResultView";

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);
  const [buffer, setBuffer] = useState([]);
  const [shape, setShape] = useState(3);

  return (
    <div className="flex flex-col gap-12 max-w-[80%] mx-auto py-20">
      <div className="flex xl:flex-row flex-col gap-6 items-center xl:items-start">
        <div className="flex flex-col gap-6 xl:items-end items-center">
          <div className="flex flex-col gap-6 justify-end items-end">
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
                          ? "bg-violet-700"
                          : "bg-neutral-800"
                      } w-10 h-10 flex flex-row items-center justify-center border-2 border-transparent hover:border-neutral-600`}
                      onClick={() => {
                        setShape(dimension);
                        setCoordinates(
                          ["x", "y", "z", "t"].slice(0, dimension)
                        );
                        setEntries(Array(dimension ** 2).fill(""));
                        setMetricConstants({});
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
              metricConstants={metricConstants}
              setMetricConstants={setMetricConstants}
              setBuffer={setBuffer}
              coordinates={coordinates}
              shape={shape}
            />
          </div>
          <Log buffer={buffer}></Log>
        </div>
        <div className="flex flex-col gap-6">
          <ul className="flex flex-col bg-neutral-950 p-2 gap-2 w-fit">
            <span className="text-lg font-medium pb-2">Symbolic computation of metric tensors with sympy</span>
            <span>- Change cells with tab and shift-tab</span>
            <span>- Supports functions: cos, sin, tan, exp, log, gamma...</span>
          </ul>

          <ResultJson metricConstants={metricConstants} setBuffer={setBuffer} />
        </div>
      </div>

      <ResultView metricConstants={metricConstants} coordinates={coordinates} />
    </div>
  );
}

export default MetricContainer;
