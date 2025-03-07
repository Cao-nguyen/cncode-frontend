import axios from "axios";

// [POST] Comments
export const CommentsClientCreate = async (fullName, chat) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/comment/create`,
    {
      fullName,
      chat,
    }
  );
  return response.data;
};
