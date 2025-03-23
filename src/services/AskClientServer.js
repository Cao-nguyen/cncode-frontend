import axios from "axios";

// [GET] Câu hỏi
export const AskRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/ask/read`
  );
  return response.data;
};

// [POST] Câu hỏi
export const AskReplyCreate = async (idPush, id, reply) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/askReply/create`,
    { idPush, id, reply }
  );
  return response.data;
};

// [POST] Câu hỏi
export const AskCreate = async (id, question) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/ask/create`,
    { id, question }
  );
  return response.data;
};
