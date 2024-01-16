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
    <div>
      {userMetrics.map((metric, index) => {
        return (
          <div key={index}>
            <Link href={`/dashboard/${metric.id}`}>
              <p>{metric.name}</p>
              <div>
                <MiniMetricContainer metric={metric.value} coordinates={metric.coordinates} />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default UserMetrics;
