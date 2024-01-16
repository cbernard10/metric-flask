import React from "react";
import CoordinatesContainer from "./CoordinatesContainer";

function MiniMetric({ metric }) {
  return (
    <>
      {metric.map((entry, index) => {
        return (
          <div
            key={index}
            className="border-2 border-neutral-700 flex flex-row items-center justify-center"
          >
            {entry === "0" ? "" : entry}
          </div>
        );
      })}
    </>
  );
}

function MiniMetricContainer({ metric, coordinates }) {
  const shape = metric.length;

  return (
    <div className="flex flex-row">
      {shape === 4 ? (
        <div className="">
          <div className="grid grid-cols-2 grid-rows-2 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <CoordinatesContainer coordinates={coordinates} />
        </div>
      ) : shape === 9 ? (
        <div>
          <div className="grid grid-cols-3 grid-rows-3 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <CoordinatesContainer coordinates={coordinates} />
        </div>
      ) : shape === 16 ? (
        <div>
          <div className="grid grid-cols-4 grid-rows-4 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <CoordinatesContainer coordinates={coordinates} />
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default MiniMetricContainer;
