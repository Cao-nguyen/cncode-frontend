import axios from "axios";

// [PATCH] Giới thiệu
export const InforApi = async (Infor) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/infor/edit`,
    {
      Infor,
    }
  );
  return response.data;
};

// [GET] Giới thiệu
export const getInforApi = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/infor/read`
  );
  return response.data;
};
