import React from "react";
import { MathJax } from "better-react-mathjax";

function TraceLatexView({ trace }) {
  return (
    <MathJax>
      {trace && `\\(\\mathrm{Tr}\\left(g\\right) = ${trace}\\)`}
    </MathJax>
  );
}

export default TraceLatexView;
