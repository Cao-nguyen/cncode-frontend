import axios from "axios";

// [GET] Người dùng
export const UserClientRead = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/read/${id}`
  );
  return response.data;
};

// [GET] Người dùng
export const UserClientEdit = async (
  id,
  fullName,
  username,
  info,
  birthday,
  tinh,
  school,
  avatar,
  web,
  git,
  zalo,
  facebook,
  tiktok,
  youtube
) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/`,
    {
      id,
      fullName,
      username,
      info,
      birthday,
      tinh,
      school,
      avatar,
      web,
      git,
      zalo,
      facebook,
      tiktok,
      youtube,
    }
  );
  return response.data;
};
