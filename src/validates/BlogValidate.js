import { toast } from "react-toastify";

export const BlogCreateValidate = (title, content, description, img, id) => {
  if (!title) {
    toast.error("Vui lòng nhập tiêu đề");
    return false;
  }

  if (!description) {
    toast.error("Vui lòng nhập mô tả cho bài viết");
    return false;
  }

  if (!content) {
    toast.error("Vui lòng nhập nội dung bài viết");
    return false;
  }

  if (!img) {
    toast.error("Bạn cần upload 1 ảnh để làm ảnh bìa");
    return false;
  }

  if (!id) {
    toast.error("Bạn cần đăng nhập để có thể đăng blog");
    return false;
  }

  return true;
};
