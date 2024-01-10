import axios from "axios";

const ping = async () => {
  const res = await axios***REMOVED***get("/api/ping");
  return res***REMOVED***data;
};

export default ping;
