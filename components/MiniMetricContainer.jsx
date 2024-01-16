import React from "react";

function MiniMetric({ metric }) {
  return (
    <>
      {metric.map((entry, index) => {
        return (
          <div
            key={index}
            className="border-2 border-neutral-700 flex flex-row items-center justify-center"
          >
            {entry}
          </div>
        );
      })}
    </>
  );
}

function MiniMetricContainer({ metric, coordinates }) {
  const shape = metric.length;

  return (
    <div>
      {shape === 4 ? (
        <div>
          <div className="grid grid-cols-2 grid-rows-2 w-[150px] h-[150px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <div className="flex flex-row">
            {coordinates.map((coordinate, index) => {
              return <p key={index}>{coordinate}</p>;
            })}
          </div>
        </div>
      ) : shape === 9 ? (
        <div>
          <div className="grid grid-cols-3 grid-rows-3 w-[150px] h-[150px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <div className="flex flex-row">
            {coordinates.map((coordinate, index) => {
              return <p key={index}>{coordinate}</p>;
            })}
          </div>
        </div>
      ) : shape === 16 ? (
        <div>
          <div className="grid grid-cols-4 grid-rows-4 w-[150px] h-[150px] border-2 border-neutral-600">
            <MiniMetric metric={metric} />
          </div>
          <div className="flex flex-row">
            {coordinates.map((coordinate, index) => {
              return <p key={index}>{coordinate}</p>;
            })}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </div>
  );
}

export default MiniMetricContainer;
