import axios from "axios";

// [PATCH] Giao diện
export const ThemeAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/theme/read`
  );
  return response.data;
};

// [PATCH] Giao diện
export const ThemeAdminEdit = async (id) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/theme/edit`,
    { id }
  );
  return response.data;
};
