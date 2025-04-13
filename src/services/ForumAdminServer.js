import axios from "axios";

// [GET] Forum
export const ForumAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/forum/read`
  );
  return response.data;
};

// [POST] Forum
export const ForumAdminCreate = async (
  name,
  description,
  law,
  allowChat,
  allowVote
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/forum/create`,
    { name, description, law, allowChat, allowVote }
  );
  return response.data;
};

// [POST] Forum
export const ForumAdminEdit = async (
  id,
  name,
  description,
  law,
  allowChat,
  allowVote
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/forum/edit`,
    { id, name, description, law, allowChat, allowVote }
  );
  return response.data;
};

// [POST] Forum
export const ForumAdminDelete = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/forum/delete`,
    { id }
  );
  return response.data;
};

// [POST] Forum
export const ForumAdminUpload = async (id, avatar) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/forum/upload`,
    { id, avatar }
  );
  return response.data;
};
