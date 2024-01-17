import React from "react";
import { MathJax } from "better-react-mathjax";

function DeterminantLatexView({ determinant }) {
  return (
    <MathJax>
      {determinant && `\\(\\mathrm{det}\\left(g\\right) = ${determinant}\\)`}
    </MathJax>
  );
}

export default DeterminantLatexView;
