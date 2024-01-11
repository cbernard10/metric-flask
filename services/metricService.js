import axios from "axios";

const get = async (what, arr, coords, diffMatrix) => {
  // console***REMOVED***log('fetching', what, arr, coords);
  const res = await axios***REMOVED***post(`/api/${what}`, {
    metric: arr,
    coords: coords,
    diffMatrix: diffMatrix
  });
  return res***REMOVED***data;
}


export default get;