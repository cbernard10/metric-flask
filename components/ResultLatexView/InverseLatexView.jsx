import React from "react";
import { MathJax } from "better-react-mathjax";

function InverseLatexView({ inverse }) {
  return <MathJax>{inverse && `\\(g^{{\\mu}{\\nu}} = ${inverse}\\)`}</MathJax>;
}

export default InverseLatexView;
