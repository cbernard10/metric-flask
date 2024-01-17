import React from "react";
import { MathJax } from "better-react-mathjax";

function ChristoffelSymbolsLatexView({
  christoffel_symbols,
  coordinates,
  type,
}) {
  return (
    <div className="flex flex-row gap-6">
      {coordinates.map((coordinate, index) => {
        return (
          <div key={index}>
            <MathJax>
              {type === 1
                ? `\\(\\Gamma_{${coordinate}..} = ${christoffel_symbols[coordinate]}\\)`
                : `\\({\\Gamma^{${coordinate}}}_{..} = ${christoffel_symbols[coordinate]}\\)`}
            </MathJax>
          </div>
        );
      })}
    </div>
  );
}

export default ChristoffelSymbolsLatexView;
