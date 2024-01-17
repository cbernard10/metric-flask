import React from "react";
import CoordinatesContainer from "./CoordinatesContainer";

function MiniMetric({ metric }) {
  return (
    <>
      {metric.map((entry, index) => {
        return (
          <div
            key={index}
            className="border-2 border-neutral-700 flex flex-row items-center justify-center  break-all text-center text-sm p-1"
          >
            {entry === "0" ? "" : entry}
          </div>
        );
      })}
    </>
  );
}

function MiniMetricContainer({ name, metric, coordinates }) {
  const shape = metric.length;

  return (
    <div className="flex flex-col font-mono gap-4 bg-neutral-950 bg-opacity-70 p-6 rounded-md border-2 border-transparent hover:border-violet-900
        active:border-violet-900 transition duration-50 ease-in-out focus:border-violet-900
    ">
      <p className="text-xl font-sans">{name}</p>
      {shape === 4 ? (
        <div className="">
          <div className="grid grid-cols-2 grid-rows-2 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
        </div>
      ) : shape === 9 ? (
        <div>
          <div className="grid grid-cols-3 grid-rows-3 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
        </div>
      ) : shape === 16 ? (
        <div>
          <div className="grid grid-cols-4 grid-rows-4 w-[200px] h-[200px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
        </div>
      ) : (
        <> </>
      )}
      <CoordinatesContainer coordinates={coordinates} />
    </div>
  );
}

export default MiniMetricContainer;
