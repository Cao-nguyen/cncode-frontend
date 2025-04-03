import axios from "axios";

// [GET] Blog
export const BlogClientRead = async () => {
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

// [POST] Like
export const BlogClientLike = async (id, idPost) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/like`,
    { id, idPost }
  );
  return response.data;
};

// [POST] Bỏ Like
export const BlogClientUnlike = async (id, idPost) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/unlike`,
    { id, idPost }
  );
  return response.data;
};

// [POST] Yêu thích
export const BlogClientF = async (id, idPost) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/f`,
    { id, idPost }
  );
  return response.data;
};

// [POST] Bỏ yêu thích
export const BlogClientUnf = async (id, idPost) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blog/unf`,
    { id, idPost }
  );
  return response.data;
};
