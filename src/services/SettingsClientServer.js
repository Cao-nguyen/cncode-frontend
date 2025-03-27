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

// [PATCH] Người dùng
export const UserClientEditInfo = async (id, info) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/info`,
    { id, info }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditBirthday = async (id, day, month, year) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/birthday`,
    { id, day, month, year }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditTinh = async (id, tinh) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/tinh`,
    { id, tinh }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditSchool = async (id, school) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/school`,
    { id, school }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditAvatar = async (id, avatar) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/avatar`,
    { id, avatar }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditWeb = async (id, web) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/web`,
    { id, web }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditGit = async (id, git) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/git`,
    { id, git }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditZalo = async (id, zalo) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/zalo`,
    { id, zalo }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditFacebook = async (id, facebook) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/facebook`,
    { id, facebook }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditTiktok = async (id, tiktok) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/tiktok`,
    { id, tiktok }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditYoutube = async (id, youtube) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/youtube`,
    { id, youtube }
  );
  return response.data;
};

// [PATCH] Người dùng
export const UserClientEditPassword = async (id, oldPassword, password) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user/edit/password`,
    { id, oldPassword, password }
  );
  return response.data;
};
