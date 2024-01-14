"use client";

import MetricContainer from "../components/MetricContainer";
import Header from "../components/Header";


export default function Home() {
  // const { data: session } = useSession();

  return (
    <main className="flex flex-col items-center justify-center gap-12">
      <Header />
      <MetricContainer />
    </main>
  );
}