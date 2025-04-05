import axios from "axios";

// [POST] Gửi tin nhắn
export const ChatClientCreate = async (id, receivedId, chat) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/chat/create`,
    { id, receivedId, chat }
  );
  return response.data;
};

// [GET] Lấy tin nhắn
export const ChatClientRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/chat/read`
  );
  return response.data;
};
