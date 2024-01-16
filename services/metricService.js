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

export const save = async (name, metric, coordinates, userEmail) => {
  const res = await axios.post(`/api/metric`, {
    metric,
    coordinates,
    name,
    userEmail,
  });
  return res.data;
};

export const update = async (id, metric, coordinates, name) => {
  const res = await axios.put(`/api/metric/${id}`, {
    metric,
    coordinates,
    name,
  });
  return res.data;
};

export const remove = async (id) => {
  const res = await axios.delete(`/api/metric/${id}`);
  return res.data;
};