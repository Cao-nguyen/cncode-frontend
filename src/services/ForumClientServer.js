import axios from "axios";

// [GET] Forum
export const ForumClientRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forum/read`
  );
  return response.data;
};

// [POST] Tham gia
export const ForumClientJoin = async (showOn, userId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forum/join`,
    {
      showOn,
      userId,
    }
  );
  return response.data;
};

// [POST] Thoát nhóm
export const ForumClientOut = async (idGroup, userId) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forum/out`,
    {
      idGroup,
      userId,
    }
  );
  return response.data;
};

// [POST] Gửi tin nhắn
export const ForumClientChat = async (
  tab,
  userId,
  reply,
  replyContent,
  chat
) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/forum/chat`,
    { tab, userId, reply, replyContent, chat }
  );
  return response.data;
};
