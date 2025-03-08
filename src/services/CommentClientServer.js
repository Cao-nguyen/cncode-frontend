import axios from "axios";

// [GET] Comments
export const CommentsClientRead = async (slug) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/read/${slug}`
  );
  return response.data;
};

// [PATCH] LikeComment
export const CommentsClientLove = async (idMain, id, fullName) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/like`,
    { idMain, id, fullName }
  );
  return response.data;
};

// [PATCH] LikeComment
export const CommentsClientUnlove = async (idMain, id, fullName) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/unlike`,
    { idMain, id, fullName }
  );
  return response.data;
};

// [DELETE] CommentsReply
export const CommentsClientDeleteReply = async (idMain, id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/delete/reply`,
    { idMain, id }
  );
  return response.data;
};

// [DELETE] Comments
export const CommentsClientDelete = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/delete`,
    { id }
  );
  return response.data;
};

// [POST] Comments
export const CommentsClientCreate = async (
  fullName,
  chat,
  slug,
  tagName,
  idChat
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/create`,
    {
      fullName,
      chat,
      slug,
      tagName,
      idChat,
    }
  );
  return response.data;
};
