"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { save } from "../services/metricService";
import { useState } from "react";

function Save({ metric, coordinates, log, setUserMetrics }) {
  const { data: session } = useSession();
  const [name, setName] = useState("");

  const handleSaveMetric = async (event) => {
    console.log("saving metric", name, metric);
    event.preventDefault();
    await save(name, metric, coordinates, session.user.email);
    setUserMetrics((prev) => [...prev, { name, coordinates, value: metric }]);
    log(`saved ${name}`, "success");
  };

  return (
    <>
      {session && (
        <div className="flex flex-row gap-4 w-full">
          <input
            id="name"
            placeholder="name"
            className="bg-neutral-800 p-2 flex-1"
            onChange={(event) => setName(event.target.value)}
          ></input>
          <button
            type="submit"
            id="compute-button"
            className="border-2 border-indigo-950 rounded-lg px-6 py-2 bg-gradient-to-tr from-indigo-950 to-indigo-800
hover:from-indigo-800 hover:to-indigo-950 hover:border-indigo-800"
            onClick={handleSaveMetric}
          >
            Save
          </button>
        </div>
      )}
    </>
  );
}

export default Save;
