import axios from "axios";

const computeMetricConstants = async (arr) => {
  const res = await axios***REMOVED***post("http://localhost:3000/api/metric", {
    metric: arr
  });
  return res***REMOVED***data;
};

export default computeMetricConstants;