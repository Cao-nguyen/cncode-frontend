import axios from "axios";

// [POST] Delete
export const DeleteBinsNews = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/news/delete`,
    { id }
  );
  return response.data;
};

// [PATCH] PatchBinNews
export const PatchBinsNews = async (id) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/news/edit`,
    { id }
  );
  return response.data;
};

// [GET] BinsNews
export const BinsNews = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/news/read`
  );
  return response.data;
};

// [POST] Delete
export const DeleteBinsBlog = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/blog/delete`,
    { id }
  );
  return response.data;
};

// [PATCH] PatchBinNews
export const PatchBinsBlog = async (id) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/blog/edit`,
    { id }
  );
  return response.data;
};

// [GET] BinsNews
export const BinsBlog = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/bins/blog/read`
  );
  return response.data;
};
