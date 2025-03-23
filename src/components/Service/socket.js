import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_BACKEND, {
  transports: ["polling"], // Chỉ dùng polling
});

export default socket;
