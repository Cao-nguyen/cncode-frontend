import axios from "axios";

// [POST] Gửi tin nhắn
export const ChatClientCreate = async (id, chat) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/chat/create`,
    { id, chat }
  );
  return response.data;
};
