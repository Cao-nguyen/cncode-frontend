import axios from "axios";
// [GET] Bài luyện tập
export const ContestAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/contest/read`
  );
  return response.data;
};

// [POST] Bài luyện tập
export const ContestAdminCreate = async (form) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/contest/create`,
    { form }
  );
  return response.data;
};
