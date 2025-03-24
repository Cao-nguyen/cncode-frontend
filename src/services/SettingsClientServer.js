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
