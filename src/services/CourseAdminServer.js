import axios from "axios";

// [POST] Khoá học
export const CourseAdminCreate = async (
  image_url,
  title,
  slug,
  user_progress,
  show,
  price,
  old_price,
  type,
  description
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/course/create`,
    {
      image_url,
      title,
      slug,
      user_progress,
      show,
      price,
      old_price,
      type,
      description,
    }
  );
  return response.data;
};

// [GET] Khoá học
export const CourseAdminRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/admin/course/read`
  );
  return response.data;
};
