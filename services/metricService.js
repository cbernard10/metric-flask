import axios from "axios";

const get = async (what, arr, coords, partial_derivatives) => {
  const res = await axios.post(`/api/${what}`, {
    metric: arr,
    coords: coords,
    partial_derivatives: partial_derivatives
  }, {timeout: 30000});
  return res.data;
}


export default get;