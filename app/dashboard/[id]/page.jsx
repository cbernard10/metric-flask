"use client";
import React from "react";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { getMetric } from "../../../services/userMetricsService";
import { useState } from "react";
import MetricView from "../../../components/MetricView";

function Page({ params }) {
  const { data: session } = useSession();
  const [metric, setMetric] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const _metric = await getMetric(params.id);
        console.log(_metric);
        setMetric(_metric);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-row justify-center">
      {session ? (
        metric ? (
          <div>{metric && <MetricView metric={metric} />}</div>
        ) : (
          <p className="pt-12">loading...</p>
        )
      ) : (
        <div>
          <p>Access Denied</p>
        </div>
      )}
    </div>
  );
}

export default Page;
