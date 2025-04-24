import axios from "axios";

// [GET] Blog
export const UserRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/user/read`
  );
  return response.data;
};
