import axios from "axios";

// [GET] Blog
export const BlogClientRead = async (username) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/read/${username}`
  );
  return response.data;
};

// [POST] Blog
export const BlogClientCreate = async (
  fullName,
  title,
  content,
  description,
  show,
  isChecked,
  img,
  username
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/create`,
    { fullName, title, content, description, show, isChecked, img, username }
  );
  return response.data;
};
