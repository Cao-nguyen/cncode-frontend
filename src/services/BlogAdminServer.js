import axios from "axios";

// [POST] CreateNew
export const CreateNew = async (
  title,
  isChecked,
  show,
  description,
  content,
  authorId
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/news/create`,
    {
      title,
      isChecked,
      show,
      description,
      content,
      authorId,
    }
  );
  return response.data;
};

// [PACTH] EditNew
export const EditNew = async (
  id,
  title,
  description,
  isChecked,
  show,
  content
) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/news/edit/${id}`,
    {
      id,
      title,
      description,
      isChecked,
      show,
      content,
    }
  );
  return response.data;
};

// [PACTH] DeleteBlog
export const BlogDelete = async (id) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/delete/${id}`,
    {
      id,
    }
  );
  return response.data;
};

// [GET] Blog
export const BlogRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/read`
  );
  return response.data;
};
