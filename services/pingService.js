import axios from "axios";

const ping = async () => {
  const res = await axios***REMOVED***get("http://localhost:3000/api/ping");
  return res***REMOVED***data;
};

export default ping;
