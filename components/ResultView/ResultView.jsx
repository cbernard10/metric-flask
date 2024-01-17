import React from "react";
import InverseView from "./InverseView";
import DerivativesView from "./DerivativesView";
import ChristoffelView from "./ChristoffelView";

function ResultView({ metricConstants, coordinates }) {
  return (
    <div className="flex flex-row flex-wrap gap-6 max-w-[80%] mx-auto">
      {metricConstants.inverse && (
        <InverseView
          inverse={metricConstants.inverse.value}
          coordinates={coordinates}
        />
      )}
      {metricConstants.partial_derivatives && (
        <DerivativesView
          partial_derivatives={metricConstants.partial_derivatives.value}
          coordinates={coordinates}
        />
      )}
      {metricConstants.christoffel_1 && (
        <ChristoffelView
          christoffel_symbols={metricConstants.christoffel_1.value}
          coordinates={coordinates}
          type={1}
        />
      )}

      {metricConstants.christoffel_2 && (
        <ChristoffelView
          christoffel_symbols={metricConstants.christoffel_2.value}
          coordinates={coordinates}
          type={2}
        />
      )}
    </div>
  );
}

export default ResultView;
