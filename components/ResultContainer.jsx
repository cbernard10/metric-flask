"use client";
import React from "react";
import { useState } from "react";
import ResultJson from "./ResultJson";
import ResultLatexView from "./ResultLatexView/ResultLatexView";
import ResultView from "./ResultView/ResultView";

function ResultContainer({ metricConstants, coordinates, setBuffer }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col items-start justify-start gap-6 w-full">
      <div className="flex flex-row gap-1">
        <button
          className={`border-2 border-transparent hover:border-neutral-600 p-1 ${
            selected === 0 ? "bg-purple-700" : "bg-neutral-800"
          }`}
          onClick={() => setSelected(0)}
        >
          JSON
        </button>
        <button
          className={`border-2 border-transparent hover:border-neutral-600  p-1 ${
            selected === 1 ? "bg-purple-700" : "bg-neutral-800"
          }`}
          onClick={() => setSelected(1)}
        >
          LaTeX
        </button>
        <button
          className={`border-2 border-transparent hover:border-neutral-600  p-1 ${
            selected === 2 ? "bg-purple-700" : "bg-neutral-800"
          }`}
          onClick={() => setSelected(2)}
        >
          Arrays
        </button>
      </div>
      <div className="flex flex-col gap-6 items-center justify-center w-full">
        {selected === 0 && (
          <ResultJson metricConstants={metricConstants} setBuffer={setBuffer} />
        )}
        {selected === 1 && (
          <ResultLatexView
            metricConstants={metricConstants}
            coordinates={coordinates}
          />
        )}
        {selected === 2 && (
          <ResultView
            metricConstants={metricConstants}
            coordinates={coordinates}
          />
        )}
      </div>
    </div>
  );
}

export default ResultContainer;
