"use client";
import React from "react";
import { useState } from "react";

function ResultJson({ metricConstants }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="gap-6 w-[800px] mx-auto flex flex-col">
      <button
        className="self-end border-2 border-transparent hover:border-neutral-600 bg-neutral-800 font-mono w-10 h-10"
        onClick={() => setCollapsed((state) => !state)}
      >
        {collapsed ? "+" : "-"}
      </button>
      {!collapsed && (
        <div className="font-mono text-start">
          <pre className="text-white">
            {JSON***REMOVED***stringify(metricConstants, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}

export default ResultJson;
