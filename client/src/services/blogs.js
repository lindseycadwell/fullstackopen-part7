import axios from "axios";

const baseUrl = "http://localhost:8000/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);

  return res.data.data;
};

const createOne = async (newBlogObject) => {
  const config = {
    headers: { authorization: token },
  };
  const res = await axios.post(baseUrl, newBlogObject, config);

  return res.data;
};

const updateOne = async (updatedBlogObject) => {
  const config = {
    headers: { authorization: token },
  };
  const updateUrl = `${baseUrl}/${updatedBlogObject.id}`;

  const res = await axios.put(updateUrl, updatedBlogObject, config);

  return res.data.data;
};

const deleteOne = async (deleteBlogObject) => {
  console.log("token :>> ", token);
  const config = {
    headers: { authorization: token },
  };
  const deleteUrl = `${baseUrl}/${deleteBlogObject.id}`;

  const res = await axios.delete(deleteUrl, config);

  return res;
};

export default { setToken, getAll, createOne, updateOne, deleteOne };
