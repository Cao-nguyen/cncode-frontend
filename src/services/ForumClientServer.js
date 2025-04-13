import axios from "axios";

// [GET] Forum
export const ForumClientRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forum/read`
  );
  return response.data;
};
