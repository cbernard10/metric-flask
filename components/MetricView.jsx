"use client";
import React from "react";
import Grid from "./Grid";
import { useState } from "react";
import { update, remove } from "../services/metricService";
import Log from "./Log";
import { useRouter } from "next/navigation";

function auto_grow(element) {
  element.style.height = "5px";
  element.style.height = element.scrollHeight + "px";
}

function focusArea(name) {
  document.getElementById(name).focus();
}

function MetricView({ metric }) {
  const [entries, setEntries] = useState(metric.value);
  const [newName, setNewName] = useState(metric.name);
  const [buffer, setBuffer] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await update(metric.id, entries, metric.coordinates, newName);
      log(`updated ${newName}`, "success");
    } catch (error) {
      console.log(error);
      log(`error updating ${newName}`, "error");
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await remove(metric.id);
      log(`deleted ${newName}`, "success");
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      log(`error deleting ${newName}`, "error");
    }
  };

  const log = (message, type) => {
    setBuffer((state) => [
      ...state,
      {
        type,
        message,
      },
    ]);
  };

  return (
    <form
      className="flex flex-col gap-4 items-center pt-16"
      onSubmit={handleSubmit}
    >
      <span className="text-4xl font-bold">{newName}</span>
      <Grid shape={metric.coordinates.length}>
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
                placeholder={
                  !entry && index % (metric.coordinates.length + 1) === 0
                    ? 1
                    : 0
                }
                onChange={(e) => {
                  console.log(e.target.value);
                  const newEntries = [...entries];
                  newEntries[index] = e.target.value;
                  setEntries(newEntries);
                }}
              ></textarea>
            </div>
          );
        })}
      </Grid>
      <div className="flex flex-col gap-6 justify-between w-full">
        <div className="flex flex-row gap-6">
          <input
            defaultValue={newName}
            id="name"
            placeholder="name"
            className="bg-neutral-800 p-2 flex-1"
            onChange={(event) => setNewName(event.target.value)}
          ></input>
          <button
            type="submit"
            id="compute-button"
            className="border-2 border-purple-950 rounded-lg px-6 py-2 bg-gradient-to-tr from-purple-950 to-purple-800
    hover:from-purple-800 hover:to-purple-950 hover:border-purple-800
          "
          >
            Update
          </button>
        </div>
        <button
          type="button"
          onClick={handleDelete}
          className="border-2 border-red-950 rounded-lg px-6 py-2 bg-gradient-to-tr from-red-950 to-red-800
    hover:from-red-800 hover:to-red-950 hover:border-red-800
          "
        >
          Delete
        </button>
      </div>
      <Log buffer={buffer}></Log>
    </form>
  );
}

export default MetricView;
