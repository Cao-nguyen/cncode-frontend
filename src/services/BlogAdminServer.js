import axios from "axios";

// [POST] CreateBlog
export const CreateBlog = async (
  title,
  isChecked,
  show,
  description,
  content,
  img,
  authorId
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/create`,
    {
      title,
      isChecked,
      show,
      description,
      content,
      img,
      authorId,
    }
  );
  return response.data;
};

// [PACTH] EditBlog
export const BlogEdit = async (
  id,
  title,
  description,
  isChecked,
  show,
  content
) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/edit/${id}`,
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

// [PATCH] Blog
export const BlogDuyet = async (idDuyet) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/duyet`,
    {
      idDuyet,
    }
  );
  return response.data;
};

// [PATCH] Blog
export const BlogTuchoi = async (idDuyet) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/blog/tuchoi`,
    {
      idDuyet,
    }
  );
  return response.data;
};
