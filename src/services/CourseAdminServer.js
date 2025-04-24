import axios from "axios";

// [GET] ShowNew
export const AccessRead = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BACKEND}/api/v1/client/access/read`
  );
  return response.data;
};
