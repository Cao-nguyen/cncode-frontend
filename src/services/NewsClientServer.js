import axios from "axios";

// [POST] Unlike Tin tức
export const NewsUnlike = async (id, idPost) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/news/client/news/unlike`,
    {
      id,
      idPost,
    }
  );
  return response.data;
};

// [POST] Like Tin tức
export const NewsLike = async (id, idPost) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/news/client/news/like`,
    {
      id,
      idPost,
    }
  );
  return response.data;
};

// [GET] Tin tức
export const ShowNewClient = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/news/client/read`
  );
  return response.data;
};
