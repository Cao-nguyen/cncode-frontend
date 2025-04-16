import axios from "axios";

// [POST] Gửi ảnh
export const SettingsAdminBannerUpload = async (avatar, link) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/settings/banner/upload`,
    { avatar, link }
  );
  return response.data;
};

// [GET] Lấy  ảnh
export const SettingsAdminBannerRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/settings/banner/read`
  );
  return response.data;
};
