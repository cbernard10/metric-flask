import React from "react";

function ResultJson({ metricConstants }) {

  const keepValues = dict => {
    let newDict = {};
    for (let key in dict) {
      if (dict[key].value) {
        newDict[key] = dict[key].value;
      }
    }
    return newDict;
  }

  return (
    <div className="gap-6 flex flex-col items-start w-full">
      <div className="font-mono text-start bg-neutral-950 w-full">
        <pre className="text-white text-sm md:text-sm lg:text-base xl:text-lg">
          {JSON.stringify(keepValues(metricConstants), null, 2)}
        </pre>
      </div>
    </div>
  );
}

export default ResultJson;
