import axios from "axios";

// [GET] Lấy user
export const ProfileClientRead = async (username) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/profile/read/${username}`
  );
  return response.data;
};

// [GET] Lấy post
export const PostClientRead = async (username) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/post/read/${username}`
  );
  return response.data;
};

// [GET] Lấy post
export const ChangeItemClientEdit = async (userId, id, count, money) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/change/edit`,
    {
      userId,
      id,
      count,
      money,
    }
  );
  return response.data;
};
