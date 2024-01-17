import React from "react";
import { MathJax } from "better-react-mathjax";

function PartialDerivativesLatexView({ partial_derivatives, coordinates }) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {coordinates.map((coordinate, index) => {
        return (
          <div key={index}>
            <MathJax>{`\\(\\frac{dg}{d${coordinate}} = ${partial_derivatives[coordinate]}\\)`}</MathJax>
          </div>
        );
      })}
    </div>
  );
}

export default PartialDerivativesLatexView;
