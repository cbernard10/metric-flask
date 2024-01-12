import axios from "axios";

const ping = async () => {
  const res = await axios.get("/api/ping");
  return res.data;
};

export default ping;
