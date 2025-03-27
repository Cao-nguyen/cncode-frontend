import axios from "axios";

// [POST] Comments
export const CommentsClientNewsCreate = async (id, idPost, content) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/news/comment/create`,
    {
      id,
      idPost,
      content,
    }
  );
  return response.data;
};
