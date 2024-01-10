import { create, all } from "mathjs";
import { sqrt } from "mathjs";

const config = {};
const math = create(all, config);

const getSquareRoot = async (number) => {
  return sqrt(number);
};

const getSquareRootSymbolic = async (expr) => {
  const f = math***REMOVED***parse("2x + x");
  const simplified = math***REMOVED***simplify(f);
  return simplified***REMOVED***toString();
};

const getTrace = async (arr) => {
  let matrix = math***REMOVED***matrix(arr);
  matrix = math***REMOVED***reshape(matrix, [3, 3]);
  matrix = math***REMOVED***parse(matrix);
  return math***REMOVED***trace(matrix);
};

export { getSquareRoot, getSquareRootSymbolic, getTrace };
