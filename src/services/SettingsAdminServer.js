import axios from "axios";

// [POST] Gửi ảnh
export const SettingsAdminUpload = async (avatar, link) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/settings/upload`,
    { avatar, link }
  );
  return response.data;
};
