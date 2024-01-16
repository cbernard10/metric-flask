import axios from "axios";

export const getUserMetrics = async () => {
  const res = await axios.get(`/api/metric`);
  return res.data;
};

export const getMetric = async (id) => {
  try {
    const res = await axios.get(`/api/metric/${id}`);
    return res.data.metric;
  } catch (error) {
    console.log(error);
  }
};
