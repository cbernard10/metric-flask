"use client";
import React from "react";
import { useState } from "react";
import Log from "./Log";
import CoordinatesForm from "./CoordinatesForm";
import MetricForm from "./MetricForm";
import ShapeSelector from "./ShapeSelector";
import ResultContainer from "./ResultContainer";
import MetricSelector from "./MetricSelector";
import { useSession } from "next-auth/react";
import { getUserMetrics } from "../services/userMetricsService";
import { useEffect } from "react";

function MetricContainer() {
  const { data: session } = useSession();
  const [userMetrics, setUserMetrics] = useState(null);
  const [entries, setEntries] = useState(Array(9).fill(""));
  const [metricConstants, setMetricConstants] = useState({});
  const [coordinates, setCoordinates] = useState(["x", "y", "z"]);
  const [buffer, setBuffer] = useState([]);
  const [shape, setShape] = useState(3);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMetrics();
      setUserMetrics(data.metrics);
      console.log(data.metrics);
    }
    session && fetchData();
  }, [session]);


  return (
    <div className="flex flex-col gap-12 max-w-[80%] mx-auto py-6 md:py-20 w-full">
      <div className="flex lg:flex-row flex-col gap-6 lg:items-start justify-center">
        <div className="flex flex-col gap-6 xl:items-end items-center">
          <div className="flex flex-col gap-2 justify-start sm:justify-end items-start sm:items-end ">
            {userMetrics && (
              <MetricSelector
                userMetrics={userMetrics}
                setUserMetrics={setUserMetrics}
                setEntries={setEntries}
                setCoordinates={setCoordinates}
                setShape={setShape}
              />
            )}
            <div className="flex items-start gap-2 flex-row sm:items-end justify-between w-full">
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
              setUserMetrics={setUserMetrics}
              setBuffer={setBuffer}
              coordinates={coordinates}
              shape={shape}
            />
          </div>
          <Log buffer={buffer}></Log>
        </div>

        <div className="flex flex-col gap-6 w-full lg:w-[50%] items-start lg:items-start w-full">
          <ul className="hidden lg:flex flex-col bg-neutral-950 p-2 gap-2">
            <span className="text-lg font-medium pb-2">
              Symbolic computation of metric tensors with sympy
            </span>
            <span>- Change cells with tab and shift-tab</span>
            <span>- Supports functions: cos, sin, tan, exp, log, gamma...</span>
          </ul>

          <ResultContainer
            metricConstants={metricConstants}
            coordinates={coordinates}
            setBuffer={setBuffer}
          />
        </div>
      </div>
    </div>
  );
}

export default MetricContainer;
