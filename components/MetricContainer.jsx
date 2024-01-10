"use client";
import React from "react";
import { useState } from "react";

import computeMetricConstants from "***REMOVED******REMOVED***/services/metricService";

function MetricContainer() {
  const [entries, setEntries] = useState(Array(9)***REMOVED***fill(""));
  const [metricConstants, setMetricConstants] = useState({});

  const handleSubmit = async (e) => {
    e***REMOVED***preventDefault();
    console***REMOVED***log("entries", entries);
    const result = await computeMetricConstants(entries);
    setMetricConstants(result);
  };

  return (
    <div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 grid-rows-3 border-2 border-white w-96 h-96">
          {entries***REMOVED***map((entry, index) => {
            return (
              <input
                className="border-2 border-white bg-neutral-900 flex justify-center items-center text-center"
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
        <button
          type="submit"
          className="border-white border-2 px-6 py-2 rounded-lg"
        >
          Compute
        </button>
      </form>
      <div>
        {Object***REMOVED***keys(metricConstants)***REMOVED***map((key) => {
          return (
            <div key={key}>
              {key}: {metricConstants[key]}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MetricContainer;
