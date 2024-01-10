import axios from "axios";

const get = async (what, arr, coords) => {
  const res = await axios***REMOVED***post(`/api/${what}`, {
    metric: arr,
    coords: coords,
  });
  return res***REMOVED***data;
}

// const getTrace = async (arr) => {
//   const res = await axios***REMOVED***post("/api/trace", {
//     metric: arr,
//   });
//   return res***REMOVED***data;
// };

// const getDeterminant = async (arr) => {
//   const res = await axios***REMOVED***post("/api/determinant", {
//     metric: arr,
//   });
//   return res***REMOVED***data;
// }

// const getDiffMatrix = async (arr) => {
//   const res = await axios***REMOVED***post("/api/diffMatrix", {
//     metric: arr,
//   });
//   return res***REMOVED***data;
// };

export default get;