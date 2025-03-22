import axios from "axios";

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
