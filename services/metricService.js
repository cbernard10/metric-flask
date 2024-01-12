import axios from "axios";

const get = async (what, arr, coords, partial_derivatives) => {
  // console***REMOVED***log('fetching', what, arr, coords);
  const res = await axios***REMOVED***post(`/api/${what}`, {
    metric: arr,
    coords: coords,
    partial_derivatives: partial_derivatives
  }, {timeout: 30000});
  return res***REMOVED***data;
}


export default get;