import axios from "axios";

// [POST] Comments
export const CommentsClientNewsCreate = async (
  id,
  currentId,
  idPost,
  content,
  replyContent
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/news/comment/create`,
    {
      id,
      currentId,
      idPost,
      content,
      replyContent,
    }
  );
  return response.data;
};

// [POST] Comments
export const CommentsClientNewsDelete = async (
  idPost,
  idPostDelete,
  parrentId
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/news/comment/delete`,
    { idPost, idPostDelete, parrentId }
  );
  return response.data;
};
