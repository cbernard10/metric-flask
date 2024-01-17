import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import PartialDerivativesLatexView from "./PartialDerivativesLatexView";

import ChristoffelSymbolsLatexView from "./ChristoffelSymbolsLatexView";

function ResultLatexView({ metricConstants, coordinates }) {
  return (
    <div className="text-xl flex flex-col gap-6">
        <MathJax>{metricConstants.trace && `\\(\\mathrm{Tr}(g)=${
          metricConstants.trace.latex
        }\\)`}</MathJax>
      <MathJax>{metricConstants.determinant && `\\(\\mathrm{Det}(g)=${
        metricConstants.determinant && metricConstants.determinant.latex
      }\\)`}</MathJax>
      <MathJax>{metricConstants.inverse && `\\(g^{-1} = ${
        metricConstants.inverse.latex
      }\\)`}</MathJax>

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
          christoffel_symbols={metricConstants.christoffel_1.latex}
          coordinates={coordinates}
          type={2}
        />
      )}
    </div>
  );
}

export default ResultLatexView;
