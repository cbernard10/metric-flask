import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PartialDerivativesLatexView from "./PartialDerivativesLatexView";
import ChristoffelSymbolsLatexView from "./ChristoffelSymbolsLatexView";
import TraceLatexView from "./TraceLatexView";
import DeterminantLatexView from "./DeterminantLatexView";
import InverseLatexView from "./InverseLatexView";

function ResultLatexView({ metricConstants, coordinates }) {
  return (
    <div className="text-2xl flex flex-col gap-6">
      {metricConstants.trace && (
        <TraceLatexView trace={metricConstants.trace.latex} />
      )}
      {metricConstants.determinant && (
        <DeterminantLatexView determinant={metricConstants.determinant.latex} />
      )}
      {metricConstants.inverse && (
        <InverseLatexView inverse={metricConstants.inverse.latex} />
      )}
      {metricConstants.partial_derivatives && (
        <PartialDerivativesLatexView
          partial_derivatives={metricConstants.partial_derivatives.latex}
          coordinates={coordinates}
        />
      )}
      {metricConstants.christoffel_1 && (
        <ChristoffelSymbolsLatexView
          christoffel_symbols={metricConstants.christoffel_1.latex}
          coordinates={coordinates}
          type={1}
        />
      )}
      {metricConstants.christoffel_2 && (
        <ChristoffelSymbolsLatexView
          christoffel_symbols={metricConstants.christoffel_2.latex}
          coordinates={coordinates}
          type={2}
        />
      )}
    </div>
  );
}

export default ResultLatexView;
