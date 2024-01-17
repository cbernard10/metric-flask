import React from "react";
import { get } from "../services/metricService";
import Grid from "./Grid";
import Save from "./Save";

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

function focusArea(name) {
  document.getElementById(name).focus();
}

function MetricForm({
  entries,
  setEntries,
  metricConstants,
  setMetricConstants,
  setBuffer,
  coordinates,
  shape,
}) {
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
    await addValue(
      "christoffel_1",
      partial_derivatives.partial_derivatives.value
    );
    try {
      await addValue(
        "christoffel_2",
        partial_derivatives.partial_derivatives.value
      );
    } catch (error) {
      log(
        "error computing christoffel symbols of the second kind: metric is not invertible",
        "error"
      );
    }
  };

  return (
    <form className="flex flex-col gap-4 items-center" onSubmit={handleSubmit}>
      <Grid shape={shape}>
        {entries.map((entry, index) => {
          return (
            <div
              key={index}
              onClick={() => focusArea(`entry-${index}`)}
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
                id={`entry-${index}`}
                value={entry.toLowerCase()}
                placeholder={!entry && index % (shape + 1) === 0 ? 1 : 0}
                onChange={(e) => {
                  const newEntries = [...entries];
                  newEntries[index] = e.target.value;
                  setEntries(newEntries);
                }}
              ></textarea>
            </div>
          );
        })}
      </Grid>
      <div className="flex flex-row gap-4 justify-end w-full">
        <Save
          metric={entries}
          metricConstants={metricConstants}
          coordinates={coordinates}
          log={log}
        />
        <button
          type="submit"
          id="compute-button"
          className="border-2 border-purple-950 rounded-lg px-6 py-2 bg-gradient-to-tr from-purple-950 to-purple-800
  hover:from-purple-800 hover:to-purple-950 hover:border-purple-800"
        >
          Compute
        </button>
      </div>
    </form>
  );
}

export default MetricForm;
