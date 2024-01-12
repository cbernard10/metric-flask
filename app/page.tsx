"use client";

import MetricContainer from "../components/MetricContainer";
import pingService from "../services/pingService";

export default function Home() {
  const handleClick = () => {
    pingService();
  };
  return (
    <main className="flex flex-col items-center justify-center gap-12">
      {/* <span>{lastJsonMessage}</span> */}
      {/* <div className="text-5xl">Input metric</div> */}
      <MetricContainer />
      {/* <button onClick={handleClick} className="bg-orange-600">
        Ping
      </button> */}
    </main>
  );
}
