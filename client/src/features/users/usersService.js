import axios from "axios";

const baseUrl = "http://localhost:8000/api/users";

const getAll = async () => {
  const res = await axios.get(baseUrl);

  return res.data.data;
};

export default { getAll };
