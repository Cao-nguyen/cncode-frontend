import axios from "axios";

// [POST] Eye New
export const EyeNewCreate = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/eye/new/create`,
    {
      id,
    }
  );
  return response.data;
};

// [POST] Eye Blog
export const EyeBlogCreate = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/eye/blog/create`,
    { id }
  );
  return response.data;
};
