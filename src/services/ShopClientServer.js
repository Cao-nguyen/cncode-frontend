import axios from "axios";

// [POST] Lấy dữ liệu
export const ShopClientCreate = async (
  buyId,
  count,
  tong,
  userId,
  userCoins
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/shop/create`,
    {
      buyId,
      count,
      tong,
      userId,
      userCoins,
    }
  );
  return response.data;
};

// [GET] Lấy dữ liệu
export const ShopClientRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/shop/read`
  );
  return response.data;
};

// [GET] Lấy dữ liệu
export const ShopUserClientRead = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/shop-user/read/${id}`
  );
  return response.data;
};
