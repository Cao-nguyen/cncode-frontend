import axios from "axios";

// [GET] Người dùng
export const UserClientRead = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/read/${id}`
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditFullName = async (id, fullName) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/fullName`,
    { id, fullName }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditUsername = async (id, username) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/username`,
    { id, username }
  );
  return response.data;
};
