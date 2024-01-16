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
        console.log(_metric)
        setMetric(_metric);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      {session ? (
        <div>
          {metric && <MetricView metric={metric} />}
          </div>
      ) : (
        <div>
          <p>Access Denied</p>
        </div>
      )}
    </>
  );
}

export default Page;
