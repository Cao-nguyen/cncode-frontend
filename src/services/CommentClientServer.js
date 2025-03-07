import axios from "axios";

// [GET] Comments
export const CommentsClientRead = async (slug) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/read/${slug}`
  );
  return response.data;
};

// [POST] Comments
export const CommentsClientCreate = async (fullName, chat, slug) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/create`,
    {
      fullName,
      chat,
      slug,
    }
  );
  return response.data;
};
