import { toast } from 'react-toastify';

export const NewsCreateValidate = (title, content) => {
    if (!title) {
        toast.error("Vui lòng nhập tiêu đề")
        return false
    }

    if (!content) {
        toast.error("Vui lòng nhập nội dung bài viết")
        return false
    }

    return true;
};