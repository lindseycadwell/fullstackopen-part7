import axios from "axios";
const baseUrl = "http://localhost:8000/api/auth";

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}/login`, credentials);
  return res.data;
};

export default { login };
