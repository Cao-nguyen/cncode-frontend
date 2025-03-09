import axios from "axios";

// [POST] Blog
export const BlogClientCreate = async (
  fullName,
  title,
  content,
  description,
  show,
  isChecked,
  img
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/create`,
    { fullName, title, content, description, show, isChecked, img }
  );
  return response.data;
};
