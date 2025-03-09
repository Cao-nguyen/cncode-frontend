import axios from "axios";

// [POST] CreateNew
export const CreateNew = async (
  title,
  isChecked,
  show,
  description,
  content,
  fullName,
  username
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/news/create`,
    {
      title,
      isChecked,
      show,
      description,
      content,
      fullName,
      username,
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

// [PACTH] EditNew
export const DeleteNew = async (id) => {
  const response = await axios.patch(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/news/delete/${id}`,
    {
      id,
    }
  );
  return response.data;
};

// [GET] ShowNew
export const ShowNew = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/news/read`
  );
  return response.data;
};
