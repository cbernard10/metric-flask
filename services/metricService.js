import axios from "axios";

export const get = async (what, arr, coords, partial_derivatives) => {
  const res = await axios.post(
    `/api/${what}`,
    {
      metric: arr,
      coords: coords,
      partial_derivatives: partial_derivatives,
    },
    { timeout: 30000 }
  );
  return res.data;
};

export const save = async (name, metric, userEmail) => {
  const res = await axios.post(`/api/metric`, {
    metric,
    name,
    userEmail,
  });
  return res.data;
};
