import axios from "axios";

// [POST] Đăng sản phẩm
export const ShopAdminCreate = async (imageUrl, name, price) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/shop/create`,
    {
      imageUrl,
      name,
      price,
    }
  );
  return response.data;
};

// [POST] Xoá sản phẩm
export const ShopAdminDelete = async (id, publicId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/shop/delete`,
    {
      id,
      publicId,
    }
  );
  return response.data;
};

// [GET] Lấy dữ liệu
export const ShopAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/shop/read`
  );
  return response.data;
};
