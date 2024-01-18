"use client";

import MetricContainer from "../components/MetricContainer";

import { MathJaxContext } from "better-react-mathjax";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center gap-12">
      <MathJaxContext>
        <MetricContainer />
      </MathJaxContext>
    </main>
  );
}
