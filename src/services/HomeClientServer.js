import axios from "axios";

// [GET] Blog
export const ThongBaoHome = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/tb/read`
  );
  return response.data;
};

// [GET] Blog
export const BlogReadHome = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/blogHome/read`
  );
  return response.data;
};

// [GET] News
export const NewsReadHome = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/newsHome/read`
  );
  return response.data;
};

// [POST] Comment
export const GrateCreateHome = async (id, rating, comment) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/grateHome/create`,
    { id, rating, comment }
  );
  return response.data;
};

// [POST] Xoá
export const GrateDeleteHome = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/grateHome/delete`,
    { id }
  );
  return response.data;
};

// [POST] Xoá
export const UserPointHome = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user-point/create`,
    { id }
  );
  return response.data;
};

// [POST] Xoá
export const UserPointRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/user-point/read`
  );
  return response.data;
};

// [GET] Comment
export const GrateReadHome = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/grateHome/read`
  );
  return response.data;
};
