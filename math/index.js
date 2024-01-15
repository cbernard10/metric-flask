import { create, all } from "mathjs";
import { sqrt } from "mathjs";

const config = {};
const math = create(all, config);

const getSquareRoot = async (number) => {
  return sqrt(number);
};

const getSquareRootSymbolic = async (expr) => {
  const f = math.parse("2x + x");
  const simplified = math.simplify(f);
  return simplified.toString();
};

const getTrace = async (arr) => {
  let matrix = math.matrix(arr);
  matrix = math.reshape(matrix, [3, 3]);
  matrix = math.parse(matrix);
  return math.trace(matrix);
};

export { getSquareRoot, getSquareRootSymbolic, getTrace };
