"use client";
import React from "react";
import { useState } from "react";
import ResultJson from "./ResultJson";
import Log from "./Log";
import CoordinatesForm from "./CoordinatesForm";
import MetricForm from "./MetricForm";
import ResultView from "./ResultView/ResultView";
import ShapeSelector from "./ShapeSelector";
import ResultLatexView from "./ResultLatexView/ResultLatexView";
import ResultContainer from "./ResultContainer";

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);
  const [buffer, setBuffer] = useState([]);
  const [shape, setShape] = useState(3);

  return (
    <div className="flex flex-col gap-12 max-w-[80%] mx-auto py-20 w-full">
      <div className="flex xl:flex-row flex-col gap-6 items-start justify-center">

        <div className="flex flex-col gap-6 xl:items-end items-center">
          <div className="flex flex-col gap-6 justify-end items-end">
            <div className="flex flex-row justify-between w-full">
              <ShapeSelector
                entries={entries}
                setShape={setShape}
                setCoordinates={setCoordinates}
                setEntries={setEntries}
                setMetricConstants={setMetricConstants}
              />
              <CoordinatesForm
                coordinates={coordinates}
                setCoordinates={setCoordinates}
              />
            </div>
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

        <div className="flex flex-col gap-6 w-[50%]">
          <ul className="flex flex-col bg-neutral-950 p-2 gap-2">
            <span className="text-lg font-medium pb-2">
              Symbolic computation of metric tensors with sympy
            </span>
            <span>- Change cells with tab and shift-tab</span>
            <span>- Supports functions: cos, sin, tan, exp, log, gamma...</span>
          </ul> 

          <ResultContainer metricConstants={metricConstants} coordinates={coordinates} setBuffer={setBuffer} />
          
        </div>
      </div>

    </div>
  );
}

export default MetricContainer;
