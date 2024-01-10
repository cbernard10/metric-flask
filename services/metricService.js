import axios from "axios";

const computeMetricConstants = async (arr) => {
  const res = await axios***REMOVED***post("/api/metric", {
    metric: arr
  });
  return res***REMOVED***data;
};

export default computeMetricConstants;