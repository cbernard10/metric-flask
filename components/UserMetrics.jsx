import React from "react";
import { useEffect, useState } from "react";

import { getUserMetrics } from "../services/userMetricsService";
import MiniMetricContainer from "./MiniMetricContainer";
import Link from "next/link";

function UserMetrics() {
  const [userMetrics, setUserMetrics] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getUserMetrics();
      setUserMetrics(data.metrics);
      console.log(data);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-medium">Your metrics:</h2>
      <div className="flex flex-row gap-6">
        {userMetrics.map((metric, index) => {
          return (
            <div key={index} className="w-fit">
              <Link href={`/dashboard/${metric.id}`}>
                <p className="text-xl font-medium">{metric.name}</p>
                <div>
                  <MiniMetricContainer
                    metric={metric.value}
                    coordinates={metric.coordinates}
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default UserMetrics;
