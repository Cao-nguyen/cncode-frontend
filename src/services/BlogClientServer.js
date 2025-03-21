import axios from "axios";

// [GET] Blog
export const BlogClientRead = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/read`
  );
  return response.data;
};

// [GET] Me Blog
export const MeblogClientRead = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/meblog/read/${id}`
  );
  return response.data;
};

// [POST] Blog
export const BlogClientCreate = async (
  title,
  content,
  description,
  show,
  isChecked,
  img,
  id
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/create`,
    { title, content, description, show, isChecked, img, id }
  );
  return response.data;
};
